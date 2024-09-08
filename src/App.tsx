import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import { css } from '@emotion/css';  // Make sure this is imported from @emotion/react
import Signin from "./pages/Signin";
import Sidebar from "./components/SideBar/SideBar";
import MyLibrary from "./pages/MyLibrary";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import Signup from "./pages/Signup";
import UploadMusic from "./pages/UploadMusic";
import MusicDetail from "./pages/MusicDetail";
import EditMusic from "./pages/EditMusic";
import SongStats from "./pages/SongStats";
import { useDispatch } from "react-redux";
import { logout } from "./store/slices/user-slice";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <AppContent
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />
    </Router>
  );
}

function AppContent({ isSidebarOpen, toggleSidebar, closeSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {

    dispatch(logout());
    window.location.href = "/"
  };
  const { loading, error, user } = useSelector(
    (state: RootState) => state.user
  );
  console.log("userrrrr", user);

  // Check if the current route is signin or signup
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/sign-up";

  const headerStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f4f4f4;
  `;

  const userInfoStyle = css`
    display: flex;
    align-items: center;
    gap: 10px; 
  `;
  const logutButtonstyle = css`
  padding: 10px;
  border-radius: 10px;
  background-color: #f56565;
  `

  return (
    <>
      {!isAuthPage && (
        <header className={`${headerStyle}`}>
          <RxHamburgerMenu onClick={toggleSidebar} />
          <div className={`${userInfoStyle}`}>
            <h4>
              {!error && user?.firstName} {!error && user?.lastName}
            </h4>
            {/* <button className={`${logutButtonstyle}`} onClick={handleLogout}>Logout</button> */}
            <CiLogout className={`${logutButtonstyle}`}onClick={handleLogout} />
          </div>
        </header>
      )}

      {!isAuthPage && <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}

      <main
        style={{
          marginLeft: !isAuthPage && isSidebarOpen ? "260px" : "0",
          transition: "margin-left 0.3s",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/my-library" element={<MyLibrary />} />
          <Route path="/stats" element={<SongStats />} />
          <Route path="/upload-music" element={<UploadMusic />} />
          <Route path="/track/:trackId" element={<MusicDetail />} />
          <Route path="/track/edit/:trackId" element={<EditMusic />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
