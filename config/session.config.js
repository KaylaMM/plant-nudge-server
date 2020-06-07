// require session
const session = require("express-session");

// require mongostore (if you need it)
const MongoStore = require("connect-mongo")(session);

// require mongoose (you need it only if you need mongostore)
const mongoose = require("mongoose");

// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = (app) => {
  //              |
  //              app is just a placeholder here but will become a real "app"
  //              in the app.js when this file gets imported/required there

  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 86400000 }, // 1 day
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 * 24, // 1 day
      }),
    })
  );
};
