// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
// const User = require("./User");

const plantSchema = new Schema(
  {
    plant: String,
    location: String,
    amountOfWaterNeeded: String,
    progressPic: {
      type: String,
      default:
        "https://i.pinimg.com/originals/a2/71/a3/a271a31dd5be2fe5bab0addf377aa13d.jpg",
    },
    
    owner: {
      type: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  }
  
);

module.exports = model("Plant", plantSchema);
