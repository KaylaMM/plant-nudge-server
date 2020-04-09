require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

require("./config/passport-login");

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//PassPort Middleware Setup
app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: ["http:localhost3000", "front-end-of-app"],
  })
);

//Route SetUp
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/allPlants", require("./routes/plant"));
app.use("/plantProgress", require("./routes/progress"));

module.exports = app;
