const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

app.use(cors({
  origin: 'http://localhost:63805/Signup', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify any headers you want to allow
}));
// Importing routes
const loginRoutes = require('./router/loginRoutes');
const signupRoutes = require('./router/signupRoutes');

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); 

// MongoDB connection
const uri = 'mongodb+srv://senapathisuresh:suresh%40123@cluster0.s73z4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));


// Using imported routes
app.use('/api/login', loginRoutes); // Corrected variable name from 'aboutRoutes' to 'authRoutes'
app.use('/api/signup', signupRoutes); // Corrected variable name from 'aboutRoutes' to 'authRoutes'

// Adding the new /api/data routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data from Node.js backend' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

app.get('/api/login', (req, res) => {
  res.json({ message: 'Data from Node.js backend' });
});
// Define the /api/login endpoint
app.post('/api/login', (req, res) => {
  // Handle the login request
  const { username, password } = req.body;
  
  // Your authentication logic goes here
  
  res.send('Login endpoint hit'); // Respond for testing
});

app.get('/api/signup', (req, res) => {
  console.log(req.body);
  const { username,email, password} = req.body;
  res.json({ message: 'Data from Node.js backend' });
});
// Define the /api/login endpoint
app.post('/api/signup', (req, res) => {
  console.log(req.body);
  const { username,email, password} = req.body;
  
  res.status(201).json({ message: 'User created successfully' });
});
// Listening on port 5000 for all routes
app.listen(5000, () => {
  console.log('Server running on port 5000');
});