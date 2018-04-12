var userModel = require('../models/user/user.model.server.js')();

module.exports = {

  findUserByCredentials: function (username, password, sess, res) {
    userModel.findUserByCredentials(username, password).then(function (result) {
      if (result == null) {
        res.status("401");
        res.json({message: "Incorrect Credentials"});
      } else {
        var user = {_id: result._id, firstName: result.firstName, lastName: result.lastName, displayPicUrl: result.displayPicUrl};
        sess.user = user;
        res.json(result);
      }
    }).catch(function (err) {
      console.log(err);
      res.status(500);
      res.json({message: err});
    });
  },

  addUser: function (body, type, sess, res) {
    var user = body;
    user.type = type;

    userModel.addUser(user).then(function (result) {
      var user = {_id: result._id, firstName: result.firstName, lastName: result.lastName, displayPicUrl: result.displayPicUrl};
      sess.user = user;
      res.json(result);
    }).catch(function (err) {
      console.log(err);
      res.status(500);
      res.json({message: err});
    });
  },

  findUserById: function (userId, sess, res) {
    userModel.findUserById(userId).then(function (user) {
      res.json(user);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  }
};
