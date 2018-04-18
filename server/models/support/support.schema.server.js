var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  _id: Number,
  name: String,
  email: String,
  subject: String,
  message: String,
  viewed: Boolean
});

