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
  var search = req.body;
  handler.findCars(search, res);
});


module.exports = router;
