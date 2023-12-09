// YourReactComponent.js
import React from "react";
import { Link } from "react-router-dom";
import "./menuBar.css"; // Import the CSS file

const MenuBar = () => {
  return (
    <div className="menubar">
      <Link><button className="menubar-btn">Customers</button></Link>
      <Link to={"/Menu"}><button className="menubar-btn">Menu</button></Link>
      <Link to={"/Orders"}><button className="menubar-btn">Orders</button></Link>
      <button className="menubar-btn">Payment</button>
    </div>
  );
};

export default MenuBar;
