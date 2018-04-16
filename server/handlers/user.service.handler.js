var userModel = require('../models/user/user.model.server.js')();

module.exports = {

  addUser: function (body, type, sess, res) {
    var user = body;
    user.type = type;
    user.rating = 4.0;

    userModel.addUser(user).then(function (result) {
      var user = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        displayPicUrl: result.displayPicUrl,
        rating: result.rating
      };
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
