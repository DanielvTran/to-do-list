// File for Signup page content

// Hooks
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

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
    <form className="signup" onSubmit={handleSubmit}>
      {/* Form Title*/}
      <h3>Sign Up</h3>

      {/* Email Input*/}
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

      {/* Password Input*/}
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />

      {/* Submission Button*/}
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default Signup;
