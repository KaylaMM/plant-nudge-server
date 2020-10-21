const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcryptjs = require("bcryptjs");

const User = require("../../models/User");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
    },
    (username, password, next) => {
      User.findOne({ username })
        .then((userFromDB) => {
          if (!userFromDB) {
            return next(null, false, { message: "Incorrect email! 🛬" });
          }
          console.log(userFromDB.passwordHash);
          if (!bcryptjs.compareSync(password, userFromDB.passwordHash)) {
            return next(null, false, { message: "Incorrect password! ❌" });
          }
          return next(null, userFromDB);
        })
        .catch((err) => {
          console.log(err);
          next(err);
        });
    }
  )
);
