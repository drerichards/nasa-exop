const launchesDB = require("./launches.schema");
const planetsDB = require("../planets/planets.schema");
let latestFlightNumber = 100;

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

saveOneLaunch(launch);

function findLaunchById(id) {
  return launchesDB.has(id);
}

async function getAllLaunches() {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
}

async function saveOneLaunch(launch) {
  // ensures launch isn't saved to a non existent planet
  const planet = await planetsDB.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  return await launchesDB.updateOne(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  //includes default values
  launchesDB.set(
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
  const abortedLaunch = launchesDB.get(id);
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
}

module.exports = { findLaunchById, getAllLaunches, addNewLaunch, abortLaunch };
