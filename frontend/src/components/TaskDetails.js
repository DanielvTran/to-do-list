// File for defining the task details to render

// Libraries
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { TaskEditModal } from "../util";

// Hooks
import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Styles
import "../styles/taskdetails.css";

// Task details content card
const TaskDetails = ({ tasks }) => {
  // Invoke the hooks
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  // States
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler Functions
  const handleDeleteClick = async () => {
    // If user is not logged in do not try and send a request
    if (!user) {
      return;
    }

    // API to handle function as a delete request
    const response = await fetch("/api/tasks/" + tasks._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json(); // Turn response into json type

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json }); // Update action for DELETE
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="task-details-container">
      <div className="card-left">
        {/* Render the priority */}
        <p className="task-priority">{tasks.priority}</p>
      </div>
      <div className="card-right">
        {/* Render the title */}
        <h4 className="task-title">{tasks.title}</h4>

        {/* Render the description */}
        <p className="task-description">
          <strong>Description: </strong>
          {tasks.description}
        </p>

        {/* Render the due date */}
        <p className="task-due-date">
          <strong>Due Date: </strong>
          {tasks.dueDate}
        </p>

        {/* Render the isCompleted */}
        <p className="task-status">
          <strong>Status: </strong>
          {tasks.isCompleted ? "Completed" : "In Progress"}
        </p>

        {/* Render the time stamp of when the task was created */}
        <p className="task-creation-date">{formatDistanceToNow(new Date(tasks.createdAt), { addSuffix: true })}</p>

        {/* Render delete button */}
        <span className="material-symbols-outlined delete-icon" onClick={handleDeleteClick}>
          delete
        </span>

        {/* Render edit button */}
        <span class="material-symbols-outlined edit-icon" onClick={handleEditClick}>
          edit
        </span>

        {/* Render the TaskEditModal when isModalOpen is true */}
        {isModalOpen && (
          <TaskEditModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} task={tasks} />
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
