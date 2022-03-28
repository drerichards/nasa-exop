// create app file and use as a listener for all routes
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const defaultRouter = require("./routes/default/default.router");

// CORS //
const whiteList = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, cb) {
      if (whiteList.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
  })
);

// MIDDLEWARE //
app.use(morgan("combined"));
// parser middleware for incoming JSON format data
app.use(express.json());
// serves up the build files from client so that client files run from server localhost
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.use(defaultRouter);

module.exports = app;
