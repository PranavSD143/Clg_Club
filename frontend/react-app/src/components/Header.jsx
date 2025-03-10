import React from "react";
import { Link } from "react-router-dom";
import "../css/Headers.css";
import Search from "./Search";
import logo from "../images/nitte_logo1.png";

function Header() {
  return (
    <header className="header">
      <nav className="nav-bar">
        {/* Left side: Logo */}
        <div className="nav-left">
          <Link to="/">
            <img src={logo} alt="Logo" className="nav-logo" />
          </Link>
        </div>

        {/* Right side: Navigation links */}
        <div className="nav-right">
          <Link to="/">
            <div className="li-styling">Home</div>
          </Link>
          <Link to="/adminPage">
            <div
              className="li-styling"
              style={{ backgroundColor: "white", color: "black" }}>
              Login
            </div>
          </Link>
          <Search />
        </div>
      </nav>
    </header>
  );
}

export default Header;
