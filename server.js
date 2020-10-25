const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*")
};

app.configure(function() {
  app.use(allowCrossDomain);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
