// routes/assignment.routes.js
const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');

// Get all assignments
router.get('/', assignmentController.getAllAssignments);

// Add a new assignment
router.post('/', assignmentController.addAssignment);

// Update an assignment
router.put('/:id', assignmentController.updateAssignment);

// Delete an assignment
router.delete('/:id', assignmentController.deleteAssignment);

module.exports = router;
