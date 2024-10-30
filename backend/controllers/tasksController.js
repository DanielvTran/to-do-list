// Database logic for tasks

// Required objects
const Task = require("../models/tasksModel");
const mongoose = require("mongoose");

// GET all tasks
const getTasks = async (req, res) => {
  const user_id = req.user._id; // Get user id

  // Find documents in database
  try {
    const tasks = await Task.find({ user_id }).sort({ createAt: -1 }); // Find all tasks based on user id in database and sort based on data created in descending order
    res.status(200).json(tasks); // Respond 200(OK) display workouts
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond 400(ERROR) display error message
  }
};

// GET single task
const getTask = async (req, res) => {
  const { id } = req.params; // Request the id given in the endpoint /:id

  // Check if the ID is of type mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  // Find documents in database by id
  try {
    const task = await Task.findById(id); // Find all tasks in database and sort based on date created in descending order
    res.status(200).json(task); // Respond 200(OK) display tasks
  } catch (error) {
    return res.status(404).json({ error: "No such task" }); // Return Respond 404(NOT FOUND) display error message
  }
};

// CREATE new task
const createTask = async (req, res) => {
  const { title, description, isCompleted, dueDate, priority, createdAt } = req.body; // Store body objects in specific variables

  let emptyFields = []; // Store form fields that are empty

  // If any of the fields are empty add it to the emptyFields[]
  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!priority) {
    emptyFields.push("priority");
  }

  // Send error message if there are elements in emptyFields[]
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add document to database
  try {
    const user_id = req.user._id; // Get the user id
    const task = await Task.create({ title, description, isCompleted, priority, dueDate, createdAt, user_id }); // Create new task document from model schema
    res.status(200).json(task); // Respond 200(OK) display the task document
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond 400(ERROR) display error message
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  const { id } = req.params; // Request the id given in the endpoint /:id

  // Check if the ID is of type mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  // Delete document from database
  try {
    const task = await Task.findOneAndDelete({ _id: id }); // Find specific task with the id and delete it
    res.status(200).json(task); // Respond 200(OK) display the task document
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond 400(ERROR) display error message
  }
};

// UPDATE task
const updateTask = async (req, res) => {
  const { id } = req.params; // Request the id given in the endpoint /:id

  // Check if the ID is of type mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  // Update document from database
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id }, // Find specific task with the id and delete it
      { ...req.body }, // Update document using the values in the req.body
      { new: true, runValidators: true } // Ensure it returns updated document
    );

    // Check if task was found and updated
    if (!task) {
      return res.status(404).json({ error: "No such task" });
    }

    res.status(200).json(task); // Respond 200(OK) display the task document
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond 400(ERROR) display error message
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
