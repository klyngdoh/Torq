var carModel = require('../models/car/car.model.server.js')();
var commentHandler = require('./comment.service.handler');
module.exports = {

  addNewCar: function (car, user, res) {
    car.renter = {_id: user._id, firstName: user.firstName, lastName: user.lastName, displayPicUrl: user.photos[0]};
    var location = car.location.split(",");
    car.location = {type: "Point", coordinates: [location[0], location[1]]};
    console.log("Going to add car ", car);
    carModel.addNewCar(car).then(function (data) {
      data.rating = commentHandler.calculateRating(data.comments);
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({error: err});
    });
  },

  approveCar: function (car, res) {
    carModel.approveCar(car).then(function (result) {
      res.json(result);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  },

  declineCar: function (car, res) {
    carModel.declineCar(car).then(function (result) {
      res.json(result);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  },

  findCars: function (search, res) { // , fuelType, carType, transmission, priceHigh, priceLow) {
    var pickup = new Date(search.pickupDate);
    var returnDate = new Date(search.returnDate);
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

    and.push({
      approved: "true"
    });

    var dateOr = [];

    dateOr.push(
      {trips: {$size: 0}}
    );
    dateOr.push({
      "trips.startDate": {
        $gt: pickup, $gte: returnDate
      }
    });

    dateOr.push({
      "trips.endDate":
        {$lte: pickup, $lt: returnDate}
    });

    dateOr.push({
      "trips.startDate": {$gt: returnDate},
      "trips.endDate": {$lt: pickup}
    });


    and.push({$or: dateOr});

    if (search.filterParams != undefined) {
      if (search.filterParams.carType.length > 0) {
        and.push({
          type: {
            $in: search.filterParams.carType
          }
        });
      }


      if (search.filterParams.transmission.length > 0) {
        and.push({
          transmission: {
            $in: search.filterParams.transmission
          }
        });
      }

      if (search.filterParams.length > 0) {
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
      for(var i=0; i< result.length; i++) {
        result[i].rating = commentHandler.calculateRating(result[i].comments);
      }
      res.json(result);
    }).catch(function (err) {
      res.status(500).json({error: err});
    });
  },


  findCarById: function (carId, res) {
    carModel.findCarById(carId).then(function (data) {
      var car = data[0];
      car.rating = commentHandler.calculateRating(car.comments);
      res.json(car);
    }).catch(function (err) {
      res.status(500).json({error: err});
    });
  },


  getUnapprovedCars: function (res) {
    carModel.getUnapprovedCars().then(function (result) {
      res.json(result);
    }).catch(function (err) {
      console.log("err = ", err);
      res.status(500).json({message: err});
    });
  },

  bookCar: function (car, user, startDate, endDate, location, res) {
    carModel.bookCar(car, user, startDate, endDate, location).then(function (data) {
      res.json({status: "success"});
    }).catch(function (err) {
      res.status(500).json({error: err});

    });
  },

  addComment: function (carId, commentObject, sess, res) {
    carModel.addComment(carId, commentObject).then(function (user) {
      res.json(commentObject);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  },

  getCarCount: function(res) {
    carModel.getCarCount().then(function(count) {
      res.send(count.toString());
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  }


}
