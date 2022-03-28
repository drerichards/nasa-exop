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

module.exports = { getAllLaunches, addNewLaunch };
