// File to define task context

// Required Packages
import { createContext, useReducer } from "react";

export const TasksContext = createContext(); // Create a context component

// Use reducer to manage what action to take based on action type
export const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { tasks: action.payload };
    case "CREATE_TASK":
      return { tasks: [action.payload, ...state.tasks] };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// Allow children of the context to use the task states globally
export const TasksContextProvider = ({ children }) => {
  // State to use TaskReducer and have intial state value of tasks
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: null,
  });

  return (
    // Dispatch to update state 'tasks' using the TasksReducer
    <TasksContext.Provider value={{ ...state, dispatch }}>{children}</TasksContext.Provider>
  );
};
