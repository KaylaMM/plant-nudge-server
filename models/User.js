const mongoose = require("mongoose");
const Plant = require("./Plant ");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    // Username provided by users during signup
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true
    },
    // Email provided by users during signup
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: true,
      lowercase: true,
      trim: true
    },
    // Password provided by users during signup
    password: {
      type: String,
      required: [true, "Password is required."],
      trim: true
    },
    // Phonenumber provided by users during signup
    phonenumber: {
      number: Number,
      required: [true, "Phone number is required."],
      trim: true
    },
    // User avatar provided by users during signup
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/originals/55/2c/c0/552cc033eca6ec4b289a96777e078954.jpg"
    },
    // Plant Page created by user
    plant: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Plant"
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);
module.exports = User;