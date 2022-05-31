const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  otp: {
    type: String,
    default: "",
  },
  otpExpire: {
    type: Number,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
