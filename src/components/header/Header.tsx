import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
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