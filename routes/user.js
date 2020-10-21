//created a read for the user to get the profile picture
//can update later where user can change profile picture
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary-setup");

const routeGuard = require("../config/route-guard.config");


//get current user profile 
router.get("/user/:userId", routeGuard, (req, res, next) => {
  console.log(req.user);
  User.findById({ user: req.params.userId })
    .then((userFromDB) => {
      console.log(userFromDB);
      res.json(userFromDB);
    })
    .catch((error) => {
      console.log("Error while getting the plants from the DB: ", error);
    });
});

module.exports = router;
