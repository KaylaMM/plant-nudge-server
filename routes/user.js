//created a read for the user to get the profile picture
//can update later where user can change profile picture
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary-setup");

const routeGuard = require("../../configs/route-guard.configs");

router.get("/user/:userId", (req, res, next) => {
  console.log(req.user);
  User.find({ _id: req.params.userId })
    .then((allUserPlantsFromDB) => {
      console.log("Retrieved plants from DB:", allUserPlantsFromDB);
      res.json(allUserPlantsFromDB);
    })
    .catch((error) => {
      console.log("Error while getting the plants from the DB: ", error);
    });
});

module.exports = router;
