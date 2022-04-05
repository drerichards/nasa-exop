const {
  findLaunchById,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
} = require("../../models/launches/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
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

function httpDeleteLaunch(req, res) {
  const launchId = +req.params.id; // converts to number

  if (!findLaunchById(launchId)) {
    return res.status(404).json({
      error: "Launch information not found",
    });
  }

  const abortedLaunch = abortLaunch(launchId);
  return res.status(200).json(abortedLaunch);
}

module.exports = { httpGetAllLaunches, httpPostNewLaunch, httpDeleteLaunch };
