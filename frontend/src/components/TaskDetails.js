// File for defining the task details to render

// Libraries
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// Hooks
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Task details content card
const TaskDetails = ({ tasks }) => {
  // Invoke the hooks
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  // Handler Functions
  const handleClick = async () => {
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

  return (
    <div className="workout-details">
      {/* Render the title */}
      <h4>{tasks.title}</h4>

      {/* Render the description */}
      <p>
        <strong>Description: </strong>
        {tasks.description}
      </p>

      {/* Render the isCompleted */}
      <p>
        <strong>Status: </strong>
        {tasks.isCompleted ? "Completed" : "In Progress"}
      </p>

      {/* Render the priority */}
      <p>
        <strong>Priority: </strong>
        {tasks.priority}
      </p>

      {/* Render the time stamp of when the task was created */}
      <p>{formatDistanceToNow(new Date(tasks.createdAt), { addSuffix: true })}</p>

      {/* Render delete button */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default TaskDetails;
