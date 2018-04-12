var express = require('express');
var handler = require('../handlers/car.service.handler.js');
var router = express.Router();


// Add new car
router.post('/addCar', function (req, res) {
  var car = req.body;
  handler.addNewCar(car, req.session, res);
});

// Search and filter cars
router.post('/searchCar', function (req, res) {
  var location = req.body['location'];
  var pickup = req.body['pickup'];
  var dropoff = req.body['dropoff'];
  handler.findCars(location, pickup, dropoff);
});


module.exports = router;
