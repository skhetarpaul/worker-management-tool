const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  post:{
    type: String,
    required: true,
    enum: ['Admin', 'Receptionist', 'Manager']
  }
});

module.exports = User = mongoose.model("users", UserSchema);