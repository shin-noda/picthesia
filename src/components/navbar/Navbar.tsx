import { Link } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  links: { label: string; to: string }[];
}

const Navbar = ({ links }: NavbarProps) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {links.map((link) => (
          <li key={link.to} className="navbar-item">
            <Link to={link.to} className="navbar-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
