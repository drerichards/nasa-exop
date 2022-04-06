const {
  findLaunchById,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
} = require("../../models/launches/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpPostNewLaunch(req, res) {
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

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpDeleteLaunch(req, res) {
  const launchId = +req.params.id; // converts to number
  const launchExists = await findLaunchById(launchId);

  if (!launchExists) {
    return res.status(404).json({
      error: "Launch information not found",
    });
  }

  const abortedLaunch = await abortLaunchById(launchId);
  if (!abortedLaunch) {
    return res.status(404).json({
      error: "Launch could not be aborted",
    });
  }
  return res.status(200).json({ ok: true });
}

module.exports = { httpGetAllLaunches, httpPostNewLaunch, httpDeleteLaunch };
