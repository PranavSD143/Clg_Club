import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Headers.module.css";
import Search from "./Search";
import logo from "../images/nitte_logo1.png";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        {/* Left side: Logo */}
        <div className={styles.navLeft}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.navLogo} />
          </Link>
        </div>

        {/* Right side: Navigation links */}
        <div className={styles.navRight}>
          <Link to="/">
            <div className={styles.liStyling}>Home</div>
          </Link>
          <Link to="/adminPage">
            <div
              className={styles.liStyling}
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
