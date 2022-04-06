const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@nasacluster.q8k4j.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => console.log("Mongo connected..."));
mongoose.connection.on("error", (err) => console.error(`Mongo error: ${err}`));

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
