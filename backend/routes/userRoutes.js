// Define the routes for the users

// Required objects
const express = require("express");

// Controller Functions
const { loginUser, signupUser } = require("../controllers/userController");

// Create router which is an instance of express
const router = express.Router();

// Routes

// Login
router.post("/login", loginUser);

// Signup
router.post("/signup", signupUser);

// Export the router
module.exports = router;
