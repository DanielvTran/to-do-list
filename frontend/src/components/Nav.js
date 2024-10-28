// File for defining the navbar

// Hooks
import { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// Styles
import "../styles/nav.css";

// Required Imports
import { Link } from "react-router-dom";

// Navbar function
const Nav = () => {
  // Invoke the functions
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // States
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 370);

  // Handler Functions
  const handleClick = () => {
    logout();
  };

  // Track screen width for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobileScreen(window.innerWidth <= 370);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="nav-container">
      <Link to="/" className="nav-logo">
        <h1 className="nav-title">TaskStream</h1>
      </Link>
      <nav className="nav-links">
        {user ? (
          <div className="nav-user">
            <span className="nav-user-email">{user.email}</span>

            {/* Screen width at 370 use icon */}
            {isMobileScreen ? (
              <span className="material-symbols-outlined nav-logout-icon" onClick={handleClick}>
                logout
              </span>
            ) : (
              <button onClick={handleClick} className="nav-logout-button">
                Logout
              </button>
            )}
          </div>
        ) : (
          <div className="nav-auth-links">
            <Link to="/login" className="nav-login-link">
              Login
            </Link>
            <Link to="/signup" className="nav-signup-link">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
