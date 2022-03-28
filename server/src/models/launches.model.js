const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kep",
  rocket: "Exp",
  launchDate: new Date("December 22, 2030"),
  target: "Kepler-442 b",
  customer: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function findLaunchById(id) {
  return launches.has(id);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  //includes default values
  launches.set(
    latestFlightNumber, // Map Key
    Object.assign(launch, {
      flightNumber: latestFlightNumber, // assign prop to value
      customer: ["NASA", "ZTM"],
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
