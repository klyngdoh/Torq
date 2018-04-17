var userSchema = require('./user.schema.server.js');
var session = require('express-session');
const db = require('../models.server.js');



module.exports = function() {

  userSchema.statics.addUser = function (user) {
    var User = db.model('User', userSchema);
    console.log("Creating user");
    console.log("here");
    var u = new User(user);

    console.log("going to save");
    return u.save();
  };

  userSchema.statics.findUserByCredentials = function(username, password){
    var User = db.model('User', userSchema);
    return User.findOne({username: username, password: password});
  };

  userSchema.statics.findUserById = function(userId){
    var User = db.model('User', userSchema);
    return User.findOne({_id: userId});
  };

  var autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(db);
  userSchema.plugin(autoIncrement.plugin, 'User');

  //return
  return db.model('User', userSchema);
};
