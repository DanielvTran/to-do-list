// File to define the schema for the user data

// Required Packages
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Create schema object
const Schema = mongoose.Schema;

// Define the schema structure
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create static login method
userSchema.statics.login = async function (email, password) {
  // Validation

  // Check if there IS an email or password
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email }); // Check if email users exists in the database already

  // Throw error if email already exists in database
  if (!user) {
    throw new Error("Incorrect email");
  }

  // Match the passwords, bcrypt returns true or false
  const match = await bcrypt.compare(password, user.password); // Compare login password with hashed password from backend

  // Throw error if password does not match
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// Create static signup method
userSchema.statics.signup = async function (email, password) {
  // Validation

  // Check if there IS an email or password
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  // Check for valid email
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  // Check for valid password
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exists = await this.findOne({ email }); // Check if email users exists in the database already

  // Throw error if email already exists in database
  if (exists) {
    throw new Error("Email already in use");
  }

  // Generate salt to added extra characters to password before hashing
  const salt = await bcrypt.genSalt(10); // Higher number of salt the longer takes for brute force. Also longer takes in signing up
  const hash = await bcrypt.hash(password, salt); // Hash the password

  const user = await this.create({ email, password: hash }); // Create user with structure, email and hashed password

  return user;
};

// Export as a collection based on the userSchema
module.exports = mongoose.model("User", userSchema);
