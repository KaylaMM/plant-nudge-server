require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/cloudinary-server", { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((error) => {
    console.error("Error connecting to mongo", error);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

require("./config/db.config");

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require("./config/session.config.js")(app);

require("./config/passport/passport.config.js")(app);

app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

app.use(
  cors({
    origin: ["http://localhost:3001", "https://herokuAppDomainURL"],
    // origin: [process.env.FRONTEND_POINT],
    credentials: true,
  })
);

//Route SetUp
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/plants", require("./routes/plant"));
app.use("/user", require("./routes/user"));
// app.use("/plantProgress", require("./routes/progress"));

module.exports = app;
