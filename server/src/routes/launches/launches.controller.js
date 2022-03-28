const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpPostNewLaunch(req, res) {
  const launch = req.body;
  let { launchDate } = launch;

  if (!launch.mission || !launch.rocket || !launchDate || !launch.target) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launchDate = new Date(launchDate);
  if (isNaN(launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date format",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = { httpGetAllLaunches, httpPostNewLaunch };
