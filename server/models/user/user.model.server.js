var userSchema = require('./user.schema.server.js');
var session = require('express-session');
const db = require('../models.server.js');


module.exports = function () {

  userSchema.statics.addUser = function (user) {
    var User = db.model('User', userSchema);
    console.log("Creating user");
    console.log("here");
    var u = new User(user);

    console.log("going to save");
    return u.save();
  };

  userSchema.statics.findUserByUsername = function (username) {
    var User = db.model('User', userSchema);
    return User.findOne({username: username});
  };

  userSchema.statics.findUserById = function (userId) {
    var User = db.model('User', userSchema);
    return User.findOne({_id: userId});
  };

  userSchema.statics.upsertUser = function (user) {
    var User = db.model('User', userSchema);
    return User.findOneAndUpdate({_id: user._id},
      {
        $set: {
          _id: user._id,
          username: user.username,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          type: 'customer',
          rating: 4.0,
          photos: user.photos
        }
      }, {
        upsert: true,
        new: true
      });
  };

// ADDING A COMMENT INTO THE DB

  userSchema.statics.addComment = function (userId, comment) {
    var User = db.model('User', userSchema);
    return User.update( {_id: userId} ,{ $push: { comments: comment } });
  };



  var autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(db);
  userSchema.plugin(autoIncrement.plugin, 'User');

//return
  return db.model('User', userSchema);
}
;
