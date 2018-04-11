var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = require('../trip/trip.schema.server');
var commentSchema = require('../comment/comment.schema.server');


module.exports = new Schema({
  _id: Number,
  make: String,
  model: String,
  type: {
    type: String,
    enum: ["Compact", "Sedan", "SUV","Sports", "Luxury"]
  },
  transmission: {
    type: String,
    enum: ["Automatic", "Manual"]
  },
  fuel: {
    type: String,
    enum: ["Petrol", "Diesel"]
  },
  pricePerDay: Number,
  description: String,
  year: Number,
  mileage: Number,
  VIN: String,
  photos:[String],
  trips: [tripSchema],
  renter: {_id: String, firstName: String, lastName: String, displayPicUrl:String},
  rating: Number,
  comments: [commentSchema],
  location: {
    type: { type: String }
    , coordinates: []
  }
});
