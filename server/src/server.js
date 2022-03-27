const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app); // create server and pass listener for all routes

const { loadPlanets } = require("./models/planets.models");

async function initServer() {
  await loadPlanets();

  server.listen(PORT, () => {
    console.log("Starting...");
  });
}

initServer();
