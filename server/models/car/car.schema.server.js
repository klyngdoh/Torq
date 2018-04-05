var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  _id: Number,
  make: String,
  model: String,
  year: Number,
  mileage: Number,
  VIN: String,
  photos:[String]
});
