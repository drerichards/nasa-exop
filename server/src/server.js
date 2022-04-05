// file for only creation of server. separate app routing functions
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 8000;
const server = http.createServer(app); // create server and pass listener for all routes

const { loadPlanetsData } = require("./models/planets/planets.model");

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@nasacluster.q8k4j.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => console.log("Mongo connected..."));
mongoose.connection.on("error", (err) => console.error(`Mongo error: ${err}`));

async function initServer() {
  console.log(MONGO_URL);
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log("Starting server...");
  });
}

initServer();
