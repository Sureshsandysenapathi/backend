// models/assignment.model.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: String, required: true }, // Use ISO string for date
});

module.exports = mongoose.model('Assignment', assignmentSchema);
