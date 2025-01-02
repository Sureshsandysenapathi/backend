const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',         // Your database host
  user: 'root',              // Your database username
  password: 'suresh@123senapathi', // Your database password
  database: 'lms_db'         // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.message);
    return;
  }
  console.log('Connected to the MySQL database!');
});

module.exports = db;
