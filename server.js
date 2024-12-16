const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const signup = require('./models/signup');
const User = require('./models/User');
const assignmentRoutes = require('./routes/assignment.routes');

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
// MongoDB connection
const uri = 'mongodb+srv://senapathisuresh:suresh%40123@cluster1.2sln3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Importing routes
const loginRoutes = require('./router/loginRoutes');
const signupRoutes = require('./router/signupRoutes');

// Using imported routes
app.use('/api/login', loginRoutes); // Corrected variable name from 'aboutRoutes' to 'authRoutes'
app.use('/api/signup', signupRoutes); // Corrected variable name from 'aboutRoutes' to 'authRoutes'
app.use('/api/assignments', assignmentsRoutes);


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

// Listening on port 5000 for all routes
app.listen(5000, () => {
  console.log('Server running on port 5000');
});