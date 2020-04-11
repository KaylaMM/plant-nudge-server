const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Plant = require("../models/Plant");
const uploadCloud = require("../config/cloudinary-setup");
// const mongoose = require("mongoose");
// const ensureLogin = require("connect-ensure-login");

//User Homepage
router.get("/", (req, res, next) => {
  User.findById(req.res._id)
    .populate("plants")
    .populate("plantProgress")
    .then((currentUser) => {
      res.status(200).json(currentUser);
    })
    .catch((err) => res.status(500).json(err));
});

//Create a new Plant
router.post("/newPlant", async (req, res, next) => {
  const newPlant = new Plant({
    plant: req.body.plant,
    location: req.body.location,
    dateLastWatered: req.body.dateLastWatered,
    amountOfWaterNeeded: req.body.amountOfWaterNeeded,
    progressPic: req.body.progressPic,
  });

  newPlant.save().then(
    ((newPlant) => {
      res.json(newPlant);
    }).catch((error) => {
      console.log(newPlant, "message: A new plant was added!");
    })
  );
});
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Read (Plant) Documents
// router.get('/plant', (req, res, next) => {
//   Plant.find(allUserPlantsFromDB)
//   .then(allUserPlantsFromDB => {
//     console.log('Retrieved plants from DB:', allUserPlantsFromDB);
//   })
//   .catch(error => {
//     console.log('Error while getting the plants from the DB: ', error);
//   })
//   res.json(allPlants)
// })

// router.get('/plant/:plantId', (req, res, next) => {
//   console.log('The ID from the URL is: ', plantId);
//   res.json(allPlants);
// });

// router.get('/plant/:plantId', (req, res, next) => {
//   Book.findOne({'_id': req.params.bookId})
//     .then(thePlant => {
//       res.json(allPlants, { plant: thePlant });
//     })
//     .catch(error => {
//       console.log('Error while retrieving plant details: ', error);
//     })
// });
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//Update a Plant
router.post("/updatePlant/:id", (req, res, next) => {
  // console.log(req.body)
  Plant.findByIdAndUpdate(
    req.params.plant_id,
    {
      plant: req.body.plant,
      location: req.body.location,
      dateLastWatered: req.body.dateLastWatered,
      amountOfWaterNeeded: req.body.amountOfWaterNeeded,
      progressPic: req.body.progressPic,
    },
    { new: true }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

//Delete Plant
router.post("/deletePlant/:id", (req, res, next) => {
  Plant.findByIdAndRemove(req.params.plant_id)
    .then((deletedPlant) => {
      res.json(deletedPlant);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
