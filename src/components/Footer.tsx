import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links-row">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Use</Link>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Picthesia. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Powered by Wikipedia & AI</span>
            <span className="separator">•</span>
            <span>Made with ❤️ for education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
