const mongoose = require("mongoose");
const User = require("./User");
const { Schema, model } = mongoose;

const Plant = new Schema(
  {
    // the user that created the board
    plant: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
    },
    // the title for the board that will be displayed to users
    location: {
      type: String,
    },
    // the jokes that will belong to the board
    dateLastWatered: {
      type: [
        {
          type: Schema.Types.ObjectId,
          // ref: "Memes"
        },
      ],
    },
    // the messages that belong to this board
    amountOfWaterNeeded: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message",
        },
      ],
    },
    // plant photo
    progressPic: {
      type: String,
      default:
        "https://i.pinimg.com/originals/a2/71/a3/a271a31dd5be2fe5bab0addf377aa13d.jpg",
    },
  },
  { timestamps: true }
);

const Plant = model("Plant", Plant);
module.exports = Plant;
