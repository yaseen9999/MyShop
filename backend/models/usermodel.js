const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  pass: String
});

module.exports = mongoose.model('UserData', userSchema);
