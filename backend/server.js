// Entry file for the express app

// Required packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/tasksRoutes");
const userRoutes = require("./routes/userRoutes");

// Start express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes Handler
app.use("/api/tasks", tasksRoutes);
app.use("/api/user", userRoutes);

// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to database & Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
