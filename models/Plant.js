// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
// const User = require("./User");

const plantSchema = new Schema(
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
          ref: "Type",
        },
      ],
    },
    // the messages that belong to this board
    amountOfWaterNeeded: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Water",
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

module.exports = model("Plant", plantSchema);
