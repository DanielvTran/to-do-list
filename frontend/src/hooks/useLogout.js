// File to define the logout request

// Context
import { useAuthContext } from "./useAuthContext";
import { useTasksContext } from "./useTasksContext";

export const useLogout = () => {
  // Invoke context methods
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: tasksDispatch } = useTasksContext();

  const logout = () => {
    localStorage.removeItem("user"); // Remove user from local storage

    authDispatch({ type: "LOGOUT" }); // Dispatch logout action
    tasksDispatch({ type: "SET_TASKS", payload: null }); // Dispatch function to clear the tasks global states
  };

  return { logout };
};
