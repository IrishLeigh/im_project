// YourReactComponent.js
import React from "react";
import { Link } from "react-router-dom";
import "./menuBar.css"; // Import the CSS file

const MenuBar = () => {
  return (
    <div className="menubar">
      <button className="menubar-btn">Customers</button>
      <button className="menubar-btn">Menu</button>
      <button className="menubar-btn">Order</button>
      <button className="menubar-btn">Payment</button>
    </div>
  );
};

export default MenuBar;
