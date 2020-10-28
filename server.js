const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const path = require('path');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/public/index.html"), function (
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
