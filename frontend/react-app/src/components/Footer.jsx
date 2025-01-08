import React from "react";
import "../css/footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-container">
      <div>{year}</div>
    </footer>
  );
}

export default Footer;
