// Example signup route in Node.js using Express
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Your User model
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password, role } = req.body; // Expecting 'role' to be either 'admin', 'faculty', or 'student'

  // Validate input data
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  // Validate role field
  const validRoles = ['admin', 'faculty', 'student'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Role must be admin, faculty, or student.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role // Store role as 'admin', 'faculty', or 'student'
    });

    await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: newUser.username,
        password:newUser.password,
        role: newUser.role
        // Exclude password from response for security
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
