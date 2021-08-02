// const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    unique: true,
    lowercase: true,
    trim: true,
  },

  passwordHash: {
    type: String,
    required: [true, "Password is required."],
    trim: true,
  },

  // phoneNumber: {
  //   type: Number,
  //   required: [true, "Phone number is required."],
  //   trim: true,
  // },

  // avatar: {
  //   type: String,
  //   default:
  //     "https://i.pinimg.com/originals/55/2c/c0/552cc033eca6ec4b289a96777e078954.jpg",
  // }
});

module.exports = model("User", userSchema);
