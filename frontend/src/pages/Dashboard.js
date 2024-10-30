// File for Dashboard page content

// Hooks
import { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Libraries
import "react-datepicker/dist/react-datepicker.css";

// Components
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

// Styles
import "../styles/dashboard.css";

const Dashboard = () => {
  // Invoke the hooks
  const { tasks, dispatch } = useTasksContext();
  const [filter, setFilter] = useState("All");
  const [titleSortOrder, setTitleSortOrder] = useState("ASC");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }); // Fetch all the tasks
      const json = await response.json(); // Turn the response data into a json

      // Check if the fetch response when through
      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json }); // Update the tasks state
      }
    };

    // Check if there is a user logged in then fetch the tasks
    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  // Filter tasks based on the selected priority
  const filteredTasks = tasks ? tasks.filter((task) => (filter === "All" ? true : task.priority === filter)) : [];

  // Sort tasks by title (A-Z or Z-A)
  const sortedTasks = filteredTasks.sort((a, b) => {
    return titleSortOrder === "ASC" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });

  return (
    <div className="dashboard-container">
      {/* Render form */}
      <TaskForm />

      <div className="main">
        {/* Filter Settings */}
        <div className="settings">
          <div className="filter-container">
            <span className="material-symbols-outlined">tune</span>
            <select
              className="priority-filter"
              id="priority-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Title Sort Options */}
          <div className="sort-container">
            <span className="material-symbols-outlined">sort</span>
            <select
              className="title-sort"
              id="title-sort"
              value={titleSortOrder}
              onChange={(e) => setTitleSortOrder(e.target.value)}
            >
              <option value="ASC">A-Z</option>
              <option value="DESC">Z-A</option>
            </select>
          </div>
        </div>

        <div className="tasks">
          {/* Render tasks */}
          {sortedTasks && sortedTasks.length > 0 ? (
            sortedTasks.map((task) => <TaskDetails key={task._id} tasks={task} />)
          ) : (
            <div className="no-tasks-container">
              <h3>There are no tasks 🥲</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
