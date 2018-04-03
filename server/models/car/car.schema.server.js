var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const carrSchema = new Schema({
  _id: Number,
  make: String,
  model: String,
  year: Number,
  mileage: Number,
  VIN: String,
  photos:[String]
});
