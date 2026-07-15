import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3 className="footer-logo">PixelForge Studio</h3>
        <p className="footer-description">
          Crafting immersive digital experiences through design and development.
        </p>

        <div className="footer-divider"></div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} PixelForge Studio. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;