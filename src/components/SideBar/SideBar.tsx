import { css } from "@emotion/css";
import Menu from "./Menu";
import { IoMdClose } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoCloudUploadSharp } from "react-icons/io5";
import logo from "../../assets/img/logo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: #171b36;
  color: #ecf0f1;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow-y: auto; /* Ensure scrolling if content overflows */
`;

const openStyles = css`
  transform: translateX(0);
`;

const closeButtonStyles = css`
  font-size: 24px;
  color: #ecf0f1;
  cursor: pointer;
  margin-bottom: 20px;
`;
const imgStyle = css`
margin-left: 20px;
width: 30%;
height: auto;
`;

const menuStyles = css`margin-top: 10px;`

const menutItems = [
  { id: 1, path: "/my-library", menuName: "My Library", icon: <IoLibrary />},
  { id: 2, path: "/stats", menuName: "Stats", icon: <IoStatsChartSharp /> },
  { id: 3, path: "/upload-music", menuName: "Upload Music", icon: <IoCloudUploadSharp /> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={`${sidebarStyles} ${isOpen ? openStyles : ""}`}>
      <IoMdClose onClick={onClose} className={closeButtonStyles} />
      <img src={logo} className={`${imgStyle}`} alt="" />
      <h4>My Tunes</h4>
      <div className={`${menuStyles}`}>
        <Menu menuItems={menutItems}/>
      </div>
        
      
    </aside>
  );
};

export default Sidebar;
