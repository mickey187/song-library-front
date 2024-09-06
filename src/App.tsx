import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Sidebar from "./components/SideBar/SideBar";
import MyLibrary from "./pages/MyLibrary";
import { RxHamburgerMenu } from "react-icons/rx";

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
  
      <header style={{ padding: "10px", backgroundColor: "#f4f4f4" }}>
        {/* <button onClick={toggleSidebar}>Toggle Sidebar</button> */}
        <RxHamburgerMenu onClick={toggleSidebar}/>
        
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main
        style={{
          marginLeft: isSidebarOpen ? '260px' : '0',
          transition: "margin-left 0.3s",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/my-library" element={<MyLibrary />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
