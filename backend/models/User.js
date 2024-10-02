// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Add password
  progress: {
    completedQuestions: [String],
    currentQuestion: String,
  },
});

module.exports = mongoose.model("User", userSchema);
