// File to define authentication context

// Required Packages
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext(); // Create a context component

// Use reducer to manage what action to take based on action type
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Allow children of the context to use the authentication states globally
export const AuthContextProvider = ({ children }) => {
  // State to use authReducer and have intial state value of users
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // Only fire this funciton once at the very start, when Context Provider render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Get if the token/user is avaible or not

    // Log the user in with avaible token from local storage if user is found
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    // Dispatch to update state 'users' using the authReducer
    <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
  );
};
