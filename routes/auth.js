//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const saltRounds = 10;
const passport = require("passport");
const User = require("../models/User");

// User SignUp
router.post("/signup", (req, res, next) => {
  const { username, email, password, phoneNumber, avatar } = req.body;
  console.log("BODY", username, email, password);
  if (!username || !email || !password) {
    res.status(401).json({ message: "Indicate username, email and password" });
    console.log(
      "-=-=-=-=-=-=-=-=-=-=-=-=-you are not being logged in -=-=-=-=-=-=-=-=-=-=-"
    );
    return;
  }

  //Password Validation
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    res.status(400).json({
      message:
        "Password needs to have at least 8 characters, and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword,
        phoneNumber,
        avatar,
      })
        .then((user) => {
          req.login(user, (error) => {
            if (error)
              return res
                .status(500)
                .json({ message: "something went wrong with log in!" });
            // user.passwordHash = undefined;
            res.status(200).json({ message: "Login successful!", user });
          });
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).json({ message: error.message });
          } else if (error.code === 11000) {
            res.status(500).json({
              message:
                "Username and email need to be unique. Either username or email is already in use.",
            });
          } else {
            next(error);
          }
        })
        .catch((error) => next(error));
    });
});

//User LogIn
router.post("/login", (req, res, next) => {
  // console.log(req.params);
  passport.authenticate("local", (error, theUser) => {
    console.log("HELLO", theUser);
    console.log({ error });
    if (error) {
      res
        .status(500)
        .json({ message: "Something went wrong with database query" });
      return;
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-
    if (!theUser) {
      console.log("not Found");
      res.status(401).json(error);
      return;
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-

    //Save User in Session
    req.login(theUser, (error) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Something went wrong with login!" });
      theUser.passwordHash = undefined;
      res.status(200).json({ message: "Login successful!", theUser });
    });
  })(req, res, next);
});

// User LogOut
router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

//not appearing when test on Postman
router.get("/isLoggedIn", (req, res) => {
  if (req.user) {
    console.log("here: ", req.user);
    req.user.passwordHash = undefined;
    res.status(200).json({ user: req.user });
    return;
  }
  res.status(304).json({ message: "Unauthorized access!" });
});

module.exports = router;
