// Database logic for users

// Required packages
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Define token structure
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// POST Login User
const loginUser = async (req, res) => {
  // Destructure the body
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password); // Use the static signup method in model to signup user using the email and password from body
    const token = createToken(user._id); // Create token
    res.status(201).json({ email, token }); // Successful send back email and token object
  } catch (error) {
    res.status(400).json({ error: error.message }); // Unsuccessful send back error message
  }
};

// Post Signup User
const signupUser = async (req, res) => {
  // Destructure the body
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password); // Use the static signup method in model to signup user using the email and password from body
    const token = createToken(user._id); // Create token
    res.status(201).json({ email, token }); // Successful send back email and token object
  } catch (error) {
    res.status(400).json({ error: error.message }); // Unsuccessful send back error message
  }
};

module.exports = {
  loginUser,
  signupUser,
};
