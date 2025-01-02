const express = require('express');
const db = require('./config/db');

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const signup = require('./models/signup');
const User = require('./models/User');
const assignmentRoutes = require('./router/assignment_routes');

// Initialize express app
const app = express();




// Middleware
app.use(express.json());
app.use(bodyParser.json()); 

app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);



// Importing routes
const loginRoutes = require('./router/loginRoutes');
const signupRoutes = require('./router/signupRoutes');

// Using imported routes
app.use('/api/login', loginRoutes); // Corrected variable name from 'aboutRoutes' to 'authRoutes'
app.use('/api/signup', signupRoutes); // Corrected variable name from 'aboutRoutes' to 'authRoutes'
app.use('/api/assignments', assignmentRoutes);


// Adding the new /api/data routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data from Node.js backend' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

app.get('/api/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ message: 'Data from Node.js backend' ,
    user: {
      username,
     
      password,
      // You might want to include additional fields if necessary
  },
  });
});
// Define the /api/login endpoint
app.post('/api/login', (req, res) => {
  // Handle the login request
  const { username, password } = req.body;
  
  // Your authentication logic goes here
  
  res.status(201).json({
     message: 'User login successfully',
     user: {
      username,
     
      password,
      // You might want to include additional fields if necessary
  },
  });
}); 
   
app.get('/api/signup', (req, res) => {
  console.log(req.body);
  const { username,email, password} = req.body;
  res.json({ 
    message: 'Data from Node.js backend' ,
    user: {
      username,
      email,
      password,
      // You might want to include additional fields if necessary
  },
  });
});
// Define the /api/login endpoint
app.post('/api/signup', (req, res) => {
  console.log(req.body);
  const { username,email, password} = req.body;
  
  res.status(201).json({
    message: 'User created successfully',
    user: {
        username,
        email,
        password,
        // You might want to include additional fields if necessary
    },
});
});

// Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

db.end();