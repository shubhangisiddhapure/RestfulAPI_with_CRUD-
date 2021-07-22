/** @format */

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  dateOfbirth: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.plugin(uniqueValidator, {
  type: "mongoose-unique-validator",
  message: "Error, expected {PATH} to be unique.",
});
module.exports = mongoose.model("User", UserSchema);
