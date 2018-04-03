var express = require('express');
var handler = require('./handlers/user.service.handler.js');
var router = express.Router();


// Find user by credential
router.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.query.password;

  if (username == undefined || password == undefined) {
    res.status(400);
    res.json({message: "Missing fields"});
  } else {
    // Find users by credentials
    handler.findUserByCredentials(username, password, res);
  }

});

// Create user
router.post('/register', function (req, res) {
  var requiredFields = ['username', 'firstname', 'lastname', 'email', 'password', 'dob', 'license'];
  for (var field in requiredFields) {
    if (!req.body[field]) {
      console.log("Got request with missing field: " + field);
      res.status(400);
      res.json({message: "Missing fields"});
    }
  }
  var user = handler.createUser(req.body);
  res.status(200);
  res.json(user);
});

// Find user by ID
router.get('/:userId', function (req, res) {
  if (!req.params.userId.toString().match(/^[0-9]{3,}$/g)) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    handler.findUserById(req.params.userId, res);
  }
});

// Update user
router.put('/:userId', function (req, res) {
  console.log("Updating user");
  if (!req.params.userId.toString().match(/^[0-9]{3,}$/g)) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else if (!req.body.username || !req.body.password) {
    res.status(400);
    res.json({message: "Missing fields"});
  } else {
    var id = req.params.userId;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var user = {};
    user['_id'] = id;
    user['username'] = username;
    user['password'] = password;
    user['firstName'] = firstName;
    user['lastName'] = lastName;
    user['email'] = email;

    handler.updateUser(id, user);
    console.log("New user = " + user);
    res.json({status: "success"});
  }
});

// Delete user
router.delete('/:userId', function (req, res) {
  if (!req.params.userId.toString().match(/^[0-9]{3,}$/g)) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    handler.deleteUser(req.params.userId);
    res.json({status: "success"});
  }
});


module.exports = router;

