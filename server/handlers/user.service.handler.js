var userModel = require('../models/user/user.model.server.js')();

module.exports = {

  addUser: function (body, type, req, res) {
    var user = body;
    user.type = type;
    user.rating = 4.0;

    userModel.addUser(user).then(function (result) {
      console.log("Result ", result);
      req.login(result, function (err) {
        if (err) {
          res.status(500);
          res.json({message: err});
        } else {
          var user = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            displayPicUrl: result.displayPicUrl,
            rating: result.rating
          };
          res.json(result);
        }
      });
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
  },

  fbLogin: function(user, req, res) {
    console.log("Goint to upsert ,", user);
    user.photos = [];
    user.photos.push(user.photo);
    userModel.upsertUser(user).then(function (result) {
      req.login(result, function (err) {
        if (err) {
          res.status(500);
          res.json({message: err});
        } else {
          var user = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            displayPicUrl: result.displayPicUrl,
            rating: result.rating
          };
          res.json(result);
        }
      });
    }).catch(function(err){
      res.status(500);
      res.json({message: err});
    });
  }
};
