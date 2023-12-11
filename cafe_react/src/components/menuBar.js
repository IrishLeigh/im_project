// YourReactComponent.js
import React from "react";
import { Link } from "react-router-dom";
import "./menuBar.css"; // Import the CSS file

const MenuBar = () => {
  return (
    <div className="menubar">
      <Link to={"/Customers"}><button className="menubar-btn">Customers</button></Link>
      <Link to={"/Menu"}><button className="menubar-btn">Menu</button></Link>
      <Link to={"/Orders"}><button className="menubar-btn">Orders</button></Link>
      <Link to={"/Payment"}><button className="menubar-btn">Payment</button></Link>
    </div>
  );
};

export default MenuBar;
