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

    and.push({
      location: {
        $near: {
          $geometry: {type: "Point", coordinates: loc},
          $maxDistance: 32000
        }
      }
    });
    console.log(search);

    if(search.filterParams != undefined) {
      if (search.filterParams.carType != undefined) {
        and.push({
          type: {
            $in: search.filterParams.carType
          }
        });
      }


      if (search.filterParams.transmissionType != undefined) {
        and.push({
          transmission: {
            $in: search.filterParams.transmissionType
          }
        });
      }

      if (search.filterParams.fuelType != undefined) {
        and.push({
          fuel: {
            $in: search.filterParams.fuelType
          }
        });
      }

      if (search.filterParams.priceLow != undefined && search.filterParams.priceHigh != undefined) {
        and.push({
          pricePerDay: {
            $gte: search.filterParams.priceLow,
            $lte: search.filterParams.priceHigh
          }
        });
      }
    }

    var mongoSearch = {$and: and};
    console.log(mongoSearch);


    carModel.findCars(mongoSearch).then(function (result) {
      res.json(result);
    }).catch(function (err) {
      res.status(500).json({error: err});
    });
  }
}
