var carSchema = require('./car.schema.server.js');
const db = require('../models.server.js');


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

  var autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(db);
  carSchema.plugin(autoIncrement.plugin, 'Car');

  //return
  return db.model('Car', carSchema);
};
