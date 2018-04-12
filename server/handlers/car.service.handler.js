var carModel = require('../models/car/car.model.server.js')();
module.exports = {

  addNewCar: function(car, sess, res) {
    car.renter = sess.user;
    console.log("Location 1 ", car.location);
    var location = car.location.split(",");
    console.log("Location = ", location);
    car.location = {type: "Point", coordinates:[location[1], location[0]]};
    console.log("Going to add car ", car);
    carModel.addNewCar(car).then(function(data) {
      res.status(500).json(data);
    }).catch(function(err){
      res.status(500).json({error: err});
    });
  },

  findCars: function(location, pickup, dropoff, res) { // , fuelType, carType, transmission, priceHigh, priceLow) {
    var loc = location.split(",");
    location = [parseFloat(loc[0]), parseFloat(loc[1])];
    console.log("location = ", location);
    carModel.findCars(location, pickup, dropoff).then(function (result) {
      res.json(result);
    }).catch(function(err) {
      res.status(500).json({error: err});
    });
  }
}
