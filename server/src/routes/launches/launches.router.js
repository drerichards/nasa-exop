const express = require("express");
const launchesRouter = express.Router();
const {
  httpGetAllLaunches,
  httpPostNewLaunch,
} = require("./launches.controller");

// '/launches' route passed in from app middleware
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpPostNewLaunch);

module.exports = launchesRouter;
