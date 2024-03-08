const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  loginBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  loginUsername: {
    type: String,
    required : true
  },
  loggedAt: {
    type: Date,
    default: Date.now,
  },
  loggedOut: {
    type: Boolean,
    default: false,
  },
  loggedOutAt: {
    type: Date,
  },
});
const Login = mongoose.model("Login", loginSchema);
module.exports = Login;