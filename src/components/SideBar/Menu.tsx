import React, { ReactElement } from "react";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";

interface MenuItemShape {
  id: number;
  path: string;
  menuName: string;
  icon: ReactElement;
}
interface MenuProps {
  menuItems: MenuItemShape[];
}
const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  const menuItemStyles = css`
    display: flex;
    align-items: center;
    padding: 10px;
    // width: 100%;
    // border: 1px solid #34495e; /* Border around each nav link */
    border-radius: 4px;
    transition: background-color 0.3s ease, color 0.3s ease;
    margin-bottom: 10px;

    &:hover {
      background-color: #1abc9c; /* Hover background color */
      color: #fff; /* Hover text color */
    }

    svg {
      margin-right: 10px;
      font-size: 20px; /* Adjust icon size if needed */
    }

    a {
      color: inherit; /* Inherit color from the parent */
      text-decoration: none;
      font-size: 16px;
    }
  `;
  return (
    <>
      <ul style={{width: '100%', padding: '0'}}>
        {menuItems.map((menuItem) => (
          <li key={menuItem.id} className={`${menuItemStyles}`}>
            <span>
              {menuItem.icon}{" "}
              <Link to={menuItem.path}>{menuItem.menuName}</Link>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Menu;
