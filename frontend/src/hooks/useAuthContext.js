// File to define the hooks for the auth context

// Components
import { AuthContext } from "../context/AuthContext";

// Hooks
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext); // Use the context created in TasksContext to make child components view states globally

  // Check if the context given is being used in the context provider
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
