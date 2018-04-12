var carModel = require('../models/car/car.model.server.js')();
module.exports = {

  addNewCar: function(car, sess, res) {
    console.log("Session user = " + sess.user.firstName);
    car.renter = sess.user;
    carModel.addNewCar(car).then(function(data) {
      res.json(data);
    }).catch(function(err){
      res.status(500).json({error: err});
    });
  },

  findCars: function(location, pickup, dropoff) { // , fuelType, carType, transmission, priceHigh, priceLow) {
    carModel.findCars(location, pickup, dropoff).then(function (result) {
      res.json(result);
    }).catch(function(err) {
      res.status(500).json({error: err});
    });
  }
}
