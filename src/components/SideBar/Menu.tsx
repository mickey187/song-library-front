import React, { ReactElement } from "react";
import {  Link } from 'react-router-dom';


interface MenuItemShape{
    id: number
    path: string,
    menuName: string,
    icon: ReactElement;
}
interface MenuProps {
  menuItems: MenuItemShape[];
}
const Menu: React.FC<MenuProps> = ({menuItems}) => {
  return <>
  <ul>
    {
    menuItems.map((menuItem)=>(
        <li key={menuItem.id}><span>{menuItem.icon} <Link to={menuItem.path}>{menuItem.menuName}</Link></span></li>
    ))
  }
  </ul>
  
  </>;
};

export default Menu;
