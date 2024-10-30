const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
// Importing routes
const authRoutes = require('./router/loginRoutes');

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://suresh:suresh%40123@cluster0.v5ck1.mongodb.net/cutm?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));


// Using imported routes
app.use('/api/auth', authRoutes); // Corrected variable name from 'aboutRoutes' to 'authRoutes'

// Adding the new /api/data routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data from Node.js backend' });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received', data });
});

// Listening on port 5000 for all routes
app.listen(5000, () => {
  console.log('Server running on port 5000');
});