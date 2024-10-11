// File to define the schema for the todolist data

// Required Packages
const mongoose = require("mongoose");

// Create schema object
const Schema = mongoose.Schema;

// Define the schema structure
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Keep track of when task is created
);

// Export as a collection based on the taskschema
module.exports = mongoose.model("Task", taskSchema);
