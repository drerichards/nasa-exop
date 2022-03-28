const express = require("express");
const defaultRouter = express.Router();

// '/*' is catch-all for unmatched routes that will pass route finding
// from server build dir to client dir using History API
defaultRouter.get("/*", (req, res) => {
  // serves build index
  res.sendFile(path.join(__dirname, "..", "..", "..", "public", "index.html"));
});

module.exports = defaultRouter;
