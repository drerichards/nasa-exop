const express = require("express");
const planetsRouter = express.Router();
const { httpGetAllPlanets } = require("./planets.controller");

// '/planets' route passed in from app middleware
planetsRouter.get("/planets", httpGetAllPlanets);

module.exports = planetsRouter;
