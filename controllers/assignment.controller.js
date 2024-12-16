// controllers/assignment.controller.js
const Assignment = require('../models/assignment.model');

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assignments', error: err });
  }
};

// Add a new assignment
exports.addAssignment = async (req, res) => {
  const { title, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ message: 'Title and Due Date are required' });
  }

  try {
    const newAssignment = new Assignment({ title, dueDate });
    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(500).json({ message: 'Error adding assignment', error: err });
  }
};

// Update an assignment
exports.updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { title, dueDate } = req.body;

  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      { title, dueDate },
      { new: true } // Return the updated document
    );
    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json(updatedAssignment);
  } catch (err) {
    res.status(500).json({ message: 'Error updating assignment', error: err });
  }
};

// Delete an assignment
exports.deleteAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting assignment', error: err });
  }
};
