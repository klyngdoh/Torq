var carSchema = require('./car.schema.server.js');
const db = require('../models.server.js');


module.exports = function() {

  carSchema.statics.addNewCar = function (car) {
    var Car = db.model('Car', carSchema);
    console.log("Adding new car");
    var c = new Car(car);

    console.log("going to save, ", c);
    return c.save();
  };

  carSchema.statics.findUserByCredentials = function(username, password){
    var User = db.model('Car', carSchema);
    return User.findOne({username: username, password: password});
  };

  carSchema.statics.findUserById = function(userId){
    var User = db.model('Car', carSchema);
    return User.findOne({_id: userId});
  };

  var autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(db);
  carSchema.plugin(autoIncrement.plugin, 'Car');

  //return
  return db.model('Car', carSchema);
};
