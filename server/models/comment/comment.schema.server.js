var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  user: {_id: String, firstName: String, lastName: String, displayPicUrl:String},
  date: Date,
  comment: String
});
