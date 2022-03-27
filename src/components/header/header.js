/*jshint esversion: 6 */
import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div>Trade Journal</div>
      </div>
      <div className="header-center">
        <span>Home</span>
        <span>Help</span>
        <span>About</span>
      </div>
      <div>Welcome, John doe</div>
    </div>
  );
};
export default Header;
