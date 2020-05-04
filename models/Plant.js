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
    //-=-=-=--=-=--=-=-=-=-=-=-=-=-=-=-=-=
    //Original Format
    // plant: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Plant",
    // },
    // location: {
    //   type: String,
    // },
    // nextWatering: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Type",
    //     },
    //   ],
    // },
    // amountOfWaterNeeded: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Water",
    //     },
    //   ],
    // },
    // plant photo
    // progressPic: {
    //   type: String,
    //   default:
    //     "https://i.pinimg.com/originals/a2/71/a3/a271a31dd5be2fe5bab0addf377aa13d.jpg",
    // },
    // Plant Page created by user
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    //not sure if owner ID is needed, have to be logged in to see plant anyways
    owner: {
      type: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  }
  //unsure if this is needed
  // {
  //   timestamps: true,
  // }
);

module.exports = model("Plant", plantSchema);
