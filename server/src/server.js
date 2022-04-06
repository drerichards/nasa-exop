// file for only creation of server. separate app routing functions
const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app); // create server and pass listener for all routes

const { loadPlanetsData } = require("./models/planets/planets.model");

async function initServer() {
  await loadPlanetsData();
  await mongoConnect();
  server.listen(PORT, () => {
    console.log("Starting server...");
  });
}

initServer();
