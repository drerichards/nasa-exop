// file for only creation of server. separate app routing functions
const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app); // create server and pass listener for all routes

const { loadPlanetsData } = require("./models/planets.model");

async function initServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log("Starting server...");
  });
}

initServer();
