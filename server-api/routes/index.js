var express = require("express");
var router = express.Router();
var axios = require("axios");
var fxml_url = "http://flightxml.flightaware.com/json/FlightXML3/";
var username = "YOURUSERNAME";
var apiKey = "YOURAPI";
var restclient = require("restler");

/* GET weaTHERR. */
router.get("/weather", function(req, res, next) {
  restclient
    .get(fxml_url + "WeatherConditions", {
      username: username,
      password: apiKey,
      query: { airport_code: "KAUS", howMany: 1 }
    })
    .on("success", function(result, response) {
      // util.puts(util.inspect(result, true, null));
      var entry = result.WeatherConditionsResult.conditions[0];

      res.send(
        "The temperature at " +
          entry.airport_code +
          " is " +
          entry.temp_air +
          "C"
      );
    })
    .on("error", function(error) {
      res.send(error);
    })
    .on("fail", function(error) {
      res.send(error);
    });
});
router.get("/flight", function(req, res, next) {
  restclient
    .get(fxml_url + "FindFlight", {
      username: username,
      password: apiKey,
      query: { origin: "KAUS", destination: "KSFO" }
    })
    .on("success", function(result, response) {
      // util.puts(util.inspect(result, true, null));
      res.send(result);
    })
    .on("error", function(error) {
      res.send(error);
    })
    .on("fail", function(error) {
      res.send(error);
    });
});

module.exports = router;
