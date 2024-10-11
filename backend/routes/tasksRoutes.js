// Define the routes todolists

// Required objects
const express = require("express");

// Required middleware
const requireAuth = require("../middleware/requireauth");

// Controller Functions
const { getTasks, getTask, createTask, deleteTask, updateTask } = require("../controllers/tasksController");

// Create router which is an instance of express
const router = express.Router();

router.use(requireAuth); // Makes sure that user is authenticated to access all task routes

// Routes

// GET all tasks
router.get("/", getTasks);

// GET single task
router.get("/:id", getTask);

// POST new task
router.post("/", createTask);

// DELETE task
router.delete("/:id", deleteTask);

// PATCH new task
router.patch("/:id", updateTask);

// Export the router
module.exports = router;
