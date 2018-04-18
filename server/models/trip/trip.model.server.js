var carModel = require('../car/car.model.server.js')();
const db = require('../models.server.js');
var tripSchema = require('../trip/trip.schema.server.js');


module.exports = function () {

  tripSchema.statics.getPendingApprovals = function (renterId) {
    return carModel.find({"trips.renter._id": renterId});
  }
//return
  return db.model('Trip', tripSchema);
}
