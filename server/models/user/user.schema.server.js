var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  type: String
});
