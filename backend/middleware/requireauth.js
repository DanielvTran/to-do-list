// File to protect the api routes

// Models
const User = require("../models/userModel");

// Packages
const jwt = require("jsonwebtoken");

// Middleware functions
const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  // Check if there is a user token
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1]; // Get token from the header which is a string example 'bearer {token}'

  try {
    const { _id } = jwt.verify(token, process.env.SECRET); // Verify the token
    req.user = await User.findOne({ _id }).select("_id"); // Find the user id only
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
