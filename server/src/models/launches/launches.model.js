const launches = require("./launches.schema");
// const launches = new Map();
let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kep",
  rocket: "Exp",
  launchDate: new Date("December 22, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};

saveLaunchData(launch);

function findLaunchById(id) {
  return launches.has(id);
}

async function getAllLaunches() {
  return launches.find({}, { _id: 0, __v: 0 });
}

async function saveLaunchData(launch) {
  return await launches.updateOne(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  //includes default values
  launches.set(
    latestFlightNumber, // Map Key
    Object.assign(launch, {
      flightNumber: latestFlightNumber, // assign prop to value
      customers: ["NASA", "ZTM"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunch(id) {
  const abortedLaunch = launches.get(id);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}

module.exports = { findLaunchById, getAllLaunches, addNewLaunch, abortLaunch };
