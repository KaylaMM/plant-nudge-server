const mongoose = require("mongoose");
const User = require("./User");
const { Schema, model } = mongoose;

const PlantPage = new Schema(
  {
    // the user that created the board
    plant: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    // the title for the board that will be displayed to users
    location: {
      type: String
    },
    // the jokes that will belong to the board
    lastTimeWatered: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Memes"
        }
      ]
    },
    // the messages that belong to this board
    amountOfWaterNeeded: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Message"
        }
      ]
    },
    // the users that are following this board
    followers: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ]
    }
  },
  { timestamps: true }
);

const PlantPage = model("PlantPage", PlantPage);
module.exports = PlantPage;
