var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = require('../comment/comment.schema.server');

module.exports = new Schema({
  _id: Number,
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  dateCreated: Date,
  displayPicUrl: String,
  licenseUrl: String,
  type: String,
  rating: Number,
  //comments:[commentSchema],
  comments: [String],
  photos:[String]
});

