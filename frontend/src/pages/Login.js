// File for Login page content

// Hooks
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

// Styles
import "../styles/auth.css";

const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isloading } = useLogin();

  // Handler Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="auth-container">
      <h3 className="heading">LOGIN</h3>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Email Input*/}
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />

        {/* Password Input*/}
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />

        {error && <div className="error">{error}</div>}

        {/* Submission Button*/}
        <button className="auth-button" disabled={isloading}>
          LOGIN
        </button>

        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
