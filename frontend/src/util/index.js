// Hooks
import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Libraries
import Modal from "react-modal";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TaskEditModal = ({ isOpen, onRequestClose, task }) => {
  // States
  const { dispatch } = useTasksContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
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

    const updatedTask = { title, description, isCompleted, priority, dueDate };

    // API to handle function as a patch request
    const response = await fetch("/api/tasks/" + task._id, {
      method: "PATCH",
      body: JSON.stringify(updatedTask),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json(); // Turn response into json type

    if (response.ok) {
      // Update global state of the tasks displayed and close the modal
      dispatch({ type: "UPDATE_TASK", payload: json });
      onRequestClose();
    } else {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Task Modal">
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
                selected={dueDate}
                onChange={(dueDate) => {
                  setDueDate(format(dueDate, "MM/dd/yyyy"));
                }}
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
        <button className="add-task-button">Update Task</button>

        {/* Display Error Message */}
        {error && <div className="error-message">{error}</div>}
      </form>
    </Modal>
  );
};
