// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await AccountUser.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
      }

      res.status(200).json({ message: "Login successful", userType: user.userType });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
};