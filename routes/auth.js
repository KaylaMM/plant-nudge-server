const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const uploadCloud = require("../config/cloudinary-setup");
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
    res.status(500).json({
      message:
        "Password needs to have at least 8 characters, and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
 
  bcrypt
  .genSalt(saltRounds)
  .then(salt => bcrypt.hash(password, salt))
  .then(hashedPassword => {
    return User.create({
      username, 
      email,
      passwordHash: hashedPassword
    })
    .then(user => {
      req.login(user, err => {
        if (error)
        return res.status(500)json({message: 'something went wrong with log in!'});
        user.passwordHash = undefined;
        res.status(200).json({message: 'Login successful!', user});
      });
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError){
        res.status(500).json({message: err.message});
      } else if (error.code === 11000){
        res.status(500).json({message: 'Username and email need to be unique. Either username or email is already in use.'});
      } else {
        next(error);
      }
    })
    .catch(error => next(error));
  });
});
  

  
//User LogIn
router.post('/login', (req,res, next) => {
  passport.authenticate('local', (errror, theUser, failureDetails) => {
    if(error){
      res.status(500).json({message: "Something went wrong with database query"});
      return;
    }

    if(!theUser){
      res.status(401).json(failureDetails);
      return;
    }


    //Save User in Session
    req.login(theUser, (error) => {
      if(error){
        res.status(500).json({message: "Something went wrong with login!"});
        user.passwordHash = undefined;
        return;
      }
      res.status(200).json({message: 'Login successful!', theUser});
    });
  })(req, res, next);
});


// User LogOut
router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({message: "Log out success!"});
});


router.get('/isLoggedIn', (req, res) => {
  if(req.user) {
    console.log('here: ', req.user);
    req.user.passwordHash = undefined;
    res.status(200).json({user: req.user});
    return;
  }
  res.status(401).json({message: 'Unauthorized access!'});
})


module.exports = router;
