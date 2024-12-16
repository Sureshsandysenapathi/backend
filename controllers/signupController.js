// Example signup route in Node.js using Express
const express = require('express');
const bcrypt = require('bcrypt');
const signup = require('../models/signup'); // Your User model
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input data
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: {
          username:newUser.username,
          email:newUser.email,
          password:newUser.password
          // Include any additional fields if necessary
      },
  });;
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
