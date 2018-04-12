var carModel = require('../models/car/car.model.server.js')();
module.exports = {

  addNewCar: function (car, sess, res) {
    car.renter = sess.user;
    console.log("Location 1 ", car.location);
    var location = car.location.split(",");
    console.log("Location = ", location);
    car.location = {type: "Point", coordinates: [location[1], location[0]]};
    console.log("Going to add car ", car);
    carModel.addNewCar(car).then(function(data) {
      res.json(data);
    }).catch(function(err){
      res.status(500).json({error: err});
    });
  },

  findCars: function (search, res) { // , fuelType, carType, transmission, priceHigh, priceLow) {
    var pickup = search.pickup;
    var dropoff = search.dropoff;
    var loc = search.location.split(",");
    location = [parseFloat(loc[0]), parseFloat(loc[1])];
    console.log("location = ", location);

    var and = [];

    add.push({
      location: {
        $near: {
          $geometry: {type: "Point", coordinates: loc},
          $maxDistance: 32000
        }
      }
    });
    console.log(search);
    if (search.carType != undefined) {
      add.push({
        type: {
          $in: search.carType
        }
      });
    }


    if (search.transmissionType != undefined) {
      add.push({
        transmission: {
          $in: search.transmissionType
        }
      });
    }

    if (search.fuelType != undefined) {
      add.push({
        fuel: {
          $in: search.fuelType
        }
      });
    }

    if (search.priceLow != undefined && search.priceHigh != undefined) {
      add.push({
        pricePerDay: {
          $gte: search.priceLow,
          $lte: search.priceHigh
        }
      });
    }


    carModel.findCars(location, pickup, dropoff).then(function (result) {
      res.json(result);
    }).catch(function (err) {
      res.status(500).json({error: err});
    });
  }
}
