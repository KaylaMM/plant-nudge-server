const mongoose = require("mongoose");
const PlantPage = require("./PlantPage ");
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
        "https://cl.goliath.com/image/upload/t_tn,f_auto,q_auto,$h_480,$w_895/go/2020/01/baby-yoda-life-size-figure-584x600-895x480.jpg"
    },
    // Plant Page created by user
    plantPage: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "PlantPage"
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
