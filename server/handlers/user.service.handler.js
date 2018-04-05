var userSchema = require('../models/user/user.schema.server');
//var userModel = db.model('User', userSchema);
var userModel = require('../models/user/user.model.server.js')();
module.exports = {

  findUserByCredentials: function(username, password, res) {
    var user = new userModel({});
    user.findUserByCredentials(username, password).then(function(result) {
      if(result == null){
        res.status("401");
        res.json({message: "Incorrect Credentials"});
      } else {
        res.json(result);
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({message: err});
    });
  },

  addUser: function(body, type) {
     var user = body;
     user.type = type;
    var usr = new userModel({});
    console.log(usr);

    console.log(usr.addUser);

    console.log("Statics");

    console.log(userSchema.addUser);
    usr.addUser(user).then(function(docs) {
      console.log("done");
      console.log(docs);
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({message: err});
    });
  },

  findUserById: function(userId, res) {
    var usr = new userModel({});
    usr.findUserById(userId).then(function(user){
      res.json(user);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  }
};
