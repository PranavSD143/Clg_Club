import React from "react";
import { Link } from "react-router-dom";
import "../css/Headers.css";
import Search from "./Search";

function Header() {
  return (
    <header className="header">
      <nav className="nav-bar">
        <Link to="/">
          <div className="li-styling">Home</div>
        </Link>
        <Link to="/clubs">
          <div className="li-styling">Clubs</div>
        </Link>
        <Link to="/admin">
          <div
            className="li-styling"
            style={{ backgroundColor: "white", color: "black" }}>
            Admin
          </div>
        </Link>
        <Search />
      </nav>
    </header>
  );
}

export default Header;
