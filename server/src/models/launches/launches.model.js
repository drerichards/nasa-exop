const launchesDB = require("./launches.schema");
const planetsDB = require("../planets/planets.schema");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kep",
  rocket: "Exp",
  launchDate: new Date("December 22, 2070"),
  target: "Kepler-1410 b",
  customers: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};

// first db entry
saveOneLaunch(launch);

async function findLaunchById(id) {
  return await launchesDB.findOne({ flightNumber: id });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-flightNumber"); // low->highest
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
}

async function saveOneLaunch(launch) {
  await launchesDB.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
}

async function scheduleNewLaunch(launch) {
  const planet = await planetsDB.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("No matching planet found");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["NASA", "ZTM"],
    upcoming: true,
    success: true,
  });
  await saveOneLaunch(newLaunch);
}

async function abortLaunchById(id) {
  const abortedLaunch = await launchesDB.updateOne(
    { flightNumber: id },
    { upcoming: false, success: false }
  );
  return abortedLaunch.modifiedCount === 1;
}

module.exports = {
  findLaunchById,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
