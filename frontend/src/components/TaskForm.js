// File for form design

// Hooks
import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  // States to store information
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [priority, setPriority] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  // Handler Functions
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refereshing of page

    // If user is not logged in do not try and send a request
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const task = { title, description, isCompleted, priority };

    // POST request for task submission
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json(); // Turn response into json type

    // Check if response is not successful and set error messages
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    // Check if response is successful and delete error messages
    if (response.ok) {
      // Reset the form
      setTitle("");
      setDescription("");
      setIsCompleted(false);
      setPriority("");
      setError(null);
      setEmptyFields([]);
      console.log("new task added:", json);
      dispatch({ type: "CREATE_TASK", payload: json }); // Update global states of the tasks displayed
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      {/* Form Title*/}
      <h3>Add a New Task</h3>

      <div>
        {/* Title Input*/}
        <label>Task Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : " "} // Change class name depending on if there is a value in title
        />

        {/* Description Input*/}
        <label>Description:</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={emptyFields.includes("title") ? "error" : " "} // Change class name depending on if there is a value in title
        />

        {/* Completed Selection Input*/}
        <div className="input-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={emptyFields.includes("priority") ? "error" : " "} // Change class name depending on if there is a value in description
          >
            <option value="" disabled></option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Submission Button*/}
      <button>Add Task</button>
      {/* Display Error on page */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
