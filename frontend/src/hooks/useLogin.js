// File to define the login requests

// Hooks
import { useState } from "react";

// Context
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  // States
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    // Set the default states
    setIsLoading(true);
    setError(null);

    // POST request for signup
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json(); // Return information about token if sucess if not error is sent

    // Check if response is not ok
    if (!response.ok) {
      setIsLoading(false); // Signup progress no longer proceeding
      setError(json.error); // Use the error message from the json response if not successful
    }

    // Check if response is ok
    if (response.ok) {
      // Save user to local storage, to keep user logged in even when browser is closed
      localStorage.setItem("user", JSON.stringify(json));

      // Update AuthContext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error }; // For use in the Signup component
};
