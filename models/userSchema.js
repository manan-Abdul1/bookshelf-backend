const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now
 },
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
