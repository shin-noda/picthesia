import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  links: { label: string; to: string }[];
  onReset?: () => void; // optional reset callback
}

const Navbar = ({ links, onReset }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (to: string) => {
    if (to === location.pathname) {
      // if already on this page, trigger reset
      onReset?.();
    } else {
      // navigating to a new page → reset first, then navigate
      onReset?.();
      navigate(to);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {links.map((link) => (
          <li key={link.to} className="navbar-item">
            <span
              className="navbar-link"
              onClick={() => handleClick(link.to)}
              style={{ cursor: "pointer" }}
            >
              {link.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
