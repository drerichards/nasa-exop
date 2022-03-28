const express = require("express");
const launchesRouter = express.Router();
const {
  httpGetAllLaunches,
  httpPostNewLaunch,
} = require("./launches.controller");

launchesRouter.get("/launches", httpGetAllLaunches);
launchesRouter.post("/launches", httpPostNewLaunch);

module.exports = launchesRouter;
