const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const User = require("./User");
const Plant = require("./Plant ");

const { Schema, model } = require("mongoose");

const progressPhotoSchema = new Schema(
  {
    // the user that created the board
    plant: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    progressPic: String,
    // plant photo
    // photos: {
    //   type: String,
    //   default:
    //     "https://i.pinimg.com/originals/a2/71/a3/a271a31dd5be2fe5bab0addf377aa13d.jpg",
    // },
  },
  { timestamps: true }
);

module.exports = model("ProgressPhoto", progressPhotoSchema);
