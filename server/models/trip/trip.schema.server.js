var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  customer: {_id: String, firstName: String, lastName: String, displayPicUrl:String},
  renter: {_id: String, firstName: String, lastName: String, displayPicUrl:String},
  startDate: Date,
  endDate: Date,
  location: {
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number]}
  },
  status: {
    type: String,
    enum: ["New", "Approved", "Ongoing", "Completed"]
  }
});
