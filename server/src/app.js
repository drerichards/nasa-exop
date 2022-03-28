// create app file and use as a listener for all routes
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

// CORS //
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// MIDDLEWARE //
app.use(morgan("combined"));
// parser middleware for incoming JSON format data
app.use(express.json());
// serves up the build files from client so that client files run from server localhost
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

// catch-all for unmatched routes to serve from client dir using History API
app.get("/*", (req, res) => {
  // serves build index
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
