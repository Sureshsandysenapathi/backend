// routes/authRoutes.js
const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/login', (req, res) => {
    // Your authentication logic
    res.send('Login endpoint hit');
  });

     

module.exports = router;