// routes/authRoutes.js
const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/login', (req, res) => {
  [
    check('username', 'Username is required').not().isEmpty(),
  
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  
  ],
    res.status(200).json({
      success: true,
      message: "Login successful",
      // Include any other necessary data
  });

});  

module.exports = router;