// routes/authRoutes.js
const express = require('express');
const { check } = require('express-validator');
const sinupController = require('../controllers/signupController');

const router = express.Router();

router.post('/signup', (req, res) => {
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('confirmPassword', 'Confirm Password is required').not().isEmpty(),
      ],
      
    res.send('signup endpoint hit');
  });

     

module.exports = router;