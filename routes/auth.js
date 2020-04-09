const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
// const uploadCloud = require("../config/cloudinary-setup");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
// const ensureLogin = require("connect-ensure-login");

// User SignUp
router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401).json({ message: "Indicate username, email and password" });
    return;
  }

  //Password Validation
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    res.json({
      message:
        "Password needs to have at least 8 characters, and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  //End of Password Validation

  User.findOne({ username })
    .then((user) => {
      if (user !== null) {
        res.status(500).json({ message: "The username already exists" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass,
      });

      return newUser.save(error => {
        if(error){
          res.status(400).json({message: 'Saving user to database went wrong.'});
          return;
        }

        req.login(newUser, (error) => {
          if (error){
            res.status(500).json({message: 'Login after signuo went bad.'});
            return;
          }

          res.status(200).json({message: 'successfully logged in'});

        })
      });
   
});

//User LogIn
router.post('/login', (req,res, next) => {
  passport.authenticate('local', (errror, theUser, failureDetails) => {
    if(error){
      res.status(500).json({message: "Something went wrong authentication user"});
      return;
    }

    if(!theUser){
      res.status(401).json(failureDetails);
      return;
    }

    //Save User in Session
    req.login(theUser, (error) => {
      if(error){
        res.status(500).json({message: "Save session went bad."});
        return;
      }
      return.status(200).json(theUser);
    });
  })(req, res, next);
})



// User LogOut
router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({message: "Log out success!"});
});

//.get User Route for Frontend
router.get('/getCurrentUser', (req, res, next) => {
  if(req.user){
    let newObject = {};
    newObject.username = req.user.username;
    newObject._id = req.user._id;

    res.status(200).json(newObject);
    return;
  }
  res.status(403).json({message: 'Unauthorized'});
});


module.exports = router;
