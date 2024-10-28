// File for Home page content

// Styles
import "../styles/home.css";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to TaskStream</h1>
      <h2 className="subheading">All in one application for managing your tasks!</h2>
      <button className="login-button" onClick={() => navigate("/login")}>
        LOGIN
      </button>
      <button className="signup-button" onClick={() => navigate("/signup")}>
        SIGN UP
      </button>
    </div>
  );
};

export default Home;
