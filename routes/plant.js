const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const Plant = require("../models/Plant");
// const uploadCloud = require("../config/cloudinary-setup");
// const ensureLogin = require("connect-ensure-login");

router.get("/plant", (req, res, next) => {
  //React Form Component
  res.render("plants");
});

//Create a new Plant
router.post("/plant", (req, res, next) => {
  const {
    plant,
    location,
    dateLastWatered,
    amountOfWaterNeeded,
    progressPic,
  } = req.body;
  const newPlant = new Plant({
    plant,
    location,
    dateLastWatered,
    amountOfWaterNeeded,
    progressPic,
  });

  newPlant
    .save()
    .then((plant => {})
    .catch((error) => {
      message: "Something went wrong";
    });
});

//Read (Plant) Documents




//Update a Plant
router.get('/plant', (req, res, next) => {
  //React Update Form Component 
  res.render("plant-update")
});

router.get('/plant', (req, res, next) => {
  Plant.findOne({_id: req.querey.plant_id})
  .then((plant) => {
    res.render("plant-update", {plant});
  })
  .catch((error) => {
    console.log(error);
  })
});

router.post('/plant', (req, res, next) => {
  const {
    plant,
    location,
    dateLastWatered,
    amountOfWaterNeeded,
    progressPic,
  } = req.body;

  Plant.update({_id: req.query.plant_id}, { $set: {plant, location, dateLastWatered, amountOfWaterNeeded, progressPic}
  })
  .then((updatedPlant) => {
    res.redirect('/plants');
  })
  .catch((error) => {
    console.log(error);
  })
});

//Delete Plant
router.post('/plant', (req, res, next) => {
  Plant.delete({_id: req.params.plant_id})
  .then((deletedPlant))
})
