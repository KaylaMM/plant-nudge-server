require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

require("./config/db.config");

app.use(
  cors({
    origin: ["http://localhost:3001", "https://herokuAppDomainURL"],
    origin: [process.env.FRONTEND_POINT],
    credentials: true,
  })
);

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//make sure express session is used before the passport

require("./config/session.config.js")(app);

require("./config/passport/passport.config.js")(app);

app.use(express.static(path.join(__dirname, "public")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

//Route SetUp
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/userPlants", require("./routes/plant"));
//not sure if this route is needed
app.use("/user", require("./routes/user"));
app.use("/progressPhotos", require("./routes/progress"));

module.exports = app;
