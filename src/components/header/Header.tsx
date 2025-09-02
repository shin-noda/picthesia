import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onReset?: () => void; // optional prop to reset the page
}

const Header = ({ onReset }: HeaderProps) => {
  const handleClick = () => {
    if (onReset) {
      onReset(); // call the reset function from parent
    }
  };

  return (
    <header className="app-header">
      <h1>
        <Link to="/" className="header-link" onClick={handleClick}>
          Picthesia
        </Link>
      </h1>
    </header>
  );
};

export default Header;
