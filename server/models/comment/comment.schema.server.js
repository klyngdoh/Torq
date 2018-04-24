var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
  // user: {_id: String, firstName: String, lastName: String, displayPicUrl:String},
  // userId: String,
  // date: Date,
  // comment: String
  commentorId: String,
  comment: String,
  commentorName: String,
  commentorPhoto: String
});
