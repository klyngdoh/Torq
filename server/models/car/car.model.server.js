var carSchema = require('./car.schema.server.js');
const db = require('../models.server.js');
var tripSchema = require('../trip/trip.schema.server.js');


module.exports = function () {

  carSchema.statics.addNewCar = function (car) {
    var Car = db.model('Car', carSchema);
    console.log("Adding new car");
    var c = new Car(car);

    console.log("going to save, ", c);
    return c.save();
  };

  carSchema.statics.findCars = function (search) {
    var Cars = db.model('Car', carSchema);
    return Cars.find(search);
  };

  carSchema.statics.findCarById = function (id) {
    var Cars = db.model('Car', carSchema);
    return Cars.find({_id: id});
  };

  carSchema.statics.approveCar = function(car) {
    var Car = db.model('Car', carSchema);
    var c = new Car;
    c._id = car._id;
    c.make = car.make;
    c.model = car.model;
    c.type = car.type;
    c.transmission = car.transmission;
    c.fuel = car.fuel;
    c.pricePerDay = car.pricePerDay;
    c.description = car.description;
    c.year = car.year;
    c.mileage = car.mileage;
    c.vin = car.vin;
    c.photos = car.photos;
    c.trips = car.trips;
    c.renter = car.renter;
    c.rating = car.rating;
    c.comments = car.comments;
    c.location = car.location;
    c.approved = "true";
    return Car.update({"_id": car._id}, c);
  };

  carSchema.statics.declineCar = function(car) {
    var Car = db.model('Car', carSchema);
    var c = new Car;
    c._id = car._id;
    c.make = car.make;
    c.model = car.model;
    c.type = car.type;
    c.transmission = car.transmission;
    c.fuel = car.fuel;
    c.pricePerDay = car.pricePerDay;
    c.description = car.description;
    c.year = car.year;
    c.mileage = car.mileage;
    c.vin = car.vin;
    c.photos = car.photos;
    c.trips = car.trips;
    c.renter = car.renter;
    c.rating = car.rating;
    c.comments = car.comments;
    c.location = car.location;
    c.approved = "declined";
    return Car.update({"_id": car._id}, c);
  };

  carSchema.statics.getUnapprovedCars = function() {
    var Cars = db.model('Car', carSchema);
    return Cars.find({approved: "false"});
  };

  carSchema.statics.bookCar = function (car, user, startDate, endDate, location) {
    var Cars = db.model('Car', carSchema);
    var Trip = db.model('Trip', tripSchema);
    var loc = location.split(",");
    location = [parseFloat(loc[0]), parseFloat(loc[1])];
    var trip = new Trip({
      customer: {_id: user._id, firstName: user.firstName, lastName: user.lastName, displayPicUrl:user.photos[0]},
      renter: car.renter,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location: {
        coordinates: [location[0], location[1]]
      },
      status: "New"
    });
    return Cars.update({_id: car._id}, {$push: {trips: trip}});
  };


  var autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(db);
  carSchema.plugin(autoIncrement.plugin, 'Car');

  //return
  return db.model('Car', carSchema);
};
