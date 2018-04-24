var userModel = require('../models/user/user.model.server.js')();
var bcrypt = require("bcrypt-nodejs");
const saltRounds = 10;
var commentHandler = require('./comment.service.handler');

module.exports = {

  addUser: function (body, type, req, res) {
    var user = body;
    user.type = type;
    user.rating = 4.0;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    userModel.addUser(user).then(function (result) {
      console.log("Result ", result);
      req.login(result, function (err) {
        if (err) {
          res.status(500);
          res.json({message: err});
        } else {
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
      user.rating = commentHandler.calculateRating(user.comments);
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
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    userModel.upsertUser(user).then(function (result) {
      req.login(result, function (err) {
        if (err) {
          res.status(500);
          res.json({message: err});
        } else {
          result.rating = commentHandler.calculateRating(result.comments);
          res.json(result);
        }
      });
    }).catch(function(err){
      res.status(500);
      res.json({message: err});
    });
  },


  addComment: function (userId, commentObject, sess, res) {
    //console.log('in user handler: userId to comemnt on and comment object are :', userId, commentObject);
    userModel.addComment(userId, commentObject).then(function (user) {
      res.json(user);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  },

  getCount: function(res) {
    userModel.getCount().then(function (count) {
      res.send(count.toString());
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  }

};
