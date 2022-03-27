// create app file and use as a listener for all routes
const express = require("express");
const cors = require("cors");
const app = express();

const planetsRouter = require("./routes/planets/planets.router");

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
app.use(express.json()); // parser middleware for incoming JSON format data
app.use(planetsRouter);

module.exports = app;
