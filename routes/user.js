//created a read for the user to get the profile picture
//can update later where user can change profile picture
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary-setup");

const routeGuard = require("../config/route-guard.config");

//to get all users in DB
//User must be signed in to be able to get/post anything in database
router.get("/users", (req, res, next) => {
  console.log("hello");
  User.getAll()
    .then((usersFromDB) => {
      console.log(usersFromDB);
      res.json(usersFromDB);
    })
    .catch((error) => {
      console.log("Error while getting the plants from the DB: ", error);
    });
});

//get current user profile picture
router.get("/user/:userId", (req, res, next) => {
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
