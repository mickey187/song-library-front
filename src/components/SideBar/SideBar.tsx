import { css } from "@emotion/css";
import Menu from "./Menu";
import { IoMdClose } from "react-icons/io";
import { VscLibrary } from "react-icons/vsc";

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
  background-color: #333;
  color: #fff;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;
    }

    a {
      color: #fff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const openStyles = css`
  transform: translateX(0);
`;

const menuStyles = css`margin-top: 10px`;

const menutItems = [
  { id: 1, path: "/my-library", menuName: "My Library" , icon: <VscLibrary />},
  { id: 2, path: "/", menuName: "Stats", icon: <VscLibrary/> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {


 
  return (
    <>
      <aside className={`${sidebarStyles} ${isOpen ? openStyles : ""}`}>
        <IoMdClose onClick={onClose} />
        <div className={menuStyles}>
            <Menu menuItems={menutItems} />
        </div>
        
      </aside>
    </>
  );
};

export default Sidebar;
