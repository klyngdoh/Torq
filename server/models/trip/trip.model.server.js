var carModel = require('../car/car.model.server.js')();
var mongoose = require('mongoose');
const db = require('../models.server.js');
var tripSchema = require('../trip/trip.schema.server.js');


module.exports = function () {

  tripSchema.statics.getPendingApprovals = function (renterId) {
    return carModel.find({"trips.renter._id": renterId});
  };

  tripSchema.statics.changeTripStatus = function (tripId, status) {
    return carModel.update({"trips._id": new mongoose.Types.ObjectId(tripId)}, {$set: {"trips.$.status": status}});
  };

  return db.model('Trip', tripSchema);
}
