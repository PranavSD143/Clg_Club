import React from "react";
import styles from "../css/footer.module.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footerContainer}>
      <div>{year}</div>
    </footer>
  );
}

export default Footer;
