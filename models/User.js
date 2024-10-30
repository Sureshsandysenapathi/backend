// models/User.js
const mongoose = require('mongoose');

const userloginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true},
});


const User = mongoose.model('User', userloginSchema);
module.exports = User;