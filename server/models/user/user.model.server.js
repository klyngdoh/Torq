var userSchema = require('./user.schema.server.js');
const db = require('../models.server.js');


module.exports = function() {

  userSchema.statics.addUser = function (user) {
    var User = db.model('User', userSchema);
    console.log("Creating user");
    console.log("here");
    var u = new User;
    u.username = user.username;
    u.password = user.password;
    u.firstName = user.firstName;
    u.lastName = user.lastName;
    u.email = user.email;
    u.dob = user.dob;
    u.type = user.type;
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
