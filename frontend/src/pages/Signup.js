// File for Signup page content

// Hooks
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

// Styles
import "../styles/auth.css";

const Signup = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  // Handler Functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div className="auth-container">
      <h3 className="heading">Sign Up</h3>
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Email Input*/}
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />

        {/* Password Input*/}
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />

        {error && <div className="error">{error}</div>}

        {/* Submission Button*/}
        <button className="auth-button" disabled={isLoading}>
          Sign Up
        </button>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
