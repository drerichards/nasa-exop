const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

// streams run async. begins when required in but may not finish when planets is referenced = null pointer
function loadPlanets(params) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data); // inits data model/store
        }
      })
      .on("error", (err) => {
        console.log({ err });
        reject(err);
      })
      .on("end", () => {
        resolve();
      });
  });
}

module.exports = {
  loadPlanets,
  planets: habitablePlanets,
};
