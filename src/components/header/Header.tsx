import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1>
        <Link to="/" className="header-link">
          Picthesia
        </Link>
      </h1>
    </header>
  );
};

export default Header;