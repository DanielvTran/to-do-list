// File for defining the navbar

// Hooks
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// Required Imports
import { Link } from "react-router-dom";

// Navbar function
const Navbar = () => {
  // Invoke the functions
  const { logout } = useLogout();
  const { user } = useAuthContext();

  // Handler Functions
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>TaskStream</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
