// File for form design

// Hooks
import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Libraries
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Styles
import "../styles/taskform.css";

const TaskForm = () => {
  // States to store information
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  // Control Variables
  const today = new Date();

  // Handler Functions
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent refreshing of page

    // If user is not logged in do not try and send a request
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const task = { title, description, isCompleted, priority, date };

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
      setDate(null);
      setError(null);
      setEmptyFields([]);
      console.log("new task added:", json);
      dispatch({ type: "CREATE_TASK", payload: json }); // Update global states of the tasks displayed
    }
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <div className="form-inputs-container">
        {/* Title Input */}
        <label className="form-label">Task Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`form-input ${emptyFields.includes("title") ? "error" : ""}`}
        />

        {/* Description Input */}
        <label className="form-label">Description:</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`form-input ${emptyFields.includes("description") ? "error" : ""}`}
        />

        <div className="row-input-container">
          {/* Due Date Input */}
          <div className="input-group">
            <label className="form-label">Due Date:</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText=""
              className="form-date"
              minDate={today}
            />
          </div>

          {/* Priority Selection Input */}
          <div className="input-group">
            <label htmlFor="priority" className="form-label">
              Priority:
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`form-select ${emptyFields.includes("priority") ? "error" : ""}`}
            >
              <option value="" disabled></option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submission Button */}
      <button className="add-task-button">Add Task</button>

      {/* Display Error Message */}
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default TaskForm;
