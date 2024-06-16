

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: String, required: true, unique: true }  
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
