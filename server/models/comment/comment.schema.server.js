var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  date: Date,
  rating: Number,
  commentorId: String,
  comment: String,
  commentorName: String,
  commentorPhoto: String
});
