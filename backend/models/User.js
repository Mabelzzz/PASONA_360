const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now, // Add timestamp when the user is created
  },
});

// Create User Model
const User = mongoose.model("User", UserSchema);

module.exports = User;
