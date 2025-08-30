import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
  return (
    <header className="app-header">
      <h1>
        <Link to="/" className="header-link" onClick={onClick}>
          Picthesia
        </Link>
      </h1>
    </header>
  );
};

export default Header;