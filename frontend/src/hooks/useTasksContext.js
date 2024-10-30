// File to define the hooks for the task context

// Components
import { TasksContext } from "../context/TaskContext";

// Hooks
import { useContext } from "react";

export const useTasksContext = () => {
  const context = useContext(TasksContext); // Use the context created in TasksContext to make child components view states globally

  // Check if the context given is being used in the context provider
  if (!context) {
    throw Error("useTasksContext must be used inside an TasksContextProvider");
  }

  return context;
};
