import React from "react";
import styles from "../css/footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.bottomSection}>
      <div className={styles.iconLinks}>
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
      </div>
      <div className={styles.year}>{year}</div>
    </footer>
  );
}

export default Footer;
