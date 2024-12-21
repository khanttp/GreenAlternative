import React from 'react';
import '../assets/styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {currentYear} EcoChoice. All rights reserved.</p>
        <div className="footer-links">
          <p href="">Privacy Policy</p>
          <p href="">Terms of Service</p>
          <p href="">Contact Us</p>
        </div>
      </div>
    </footer>
  );
}

