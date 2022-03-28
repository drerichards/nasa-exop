const express = require("express");
const launchesRouter = express.Router();
const {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

// '/launches' route passed in from app middleware
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpPostNewLaunch);
launchesRouter.delete("/:id", httpDeleteLaunch);

module.exports = launchesRouter;
