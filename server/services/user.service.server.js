var express = require('express');
var handler = require('../handlers/user.service.handler.js');
var router = express.Router();
var crypto = require('crypto');
var multer = require('multer');

var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads/users/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      var name = raw.toString('hex') + '-' + Date.now() + '.' + file.mimetype.split('/')[1];
      console.log("Storing file, ", name);
      cb(null, name);
    })
  }
});

var upload = multer({storage: storage});
var passport = require('passport');



// Find user by credential
router.post('/login', passport.authenticate('local', { failureFlash: 'Invalid username or password.' }),
  function(req, res) {
    res.json(req.user);
  });


// Create user normal
// router.post('/:type/register', function (req, res) {
//   var requiredFields = ['username', 'firstname', 'lastname', 'email', 'password', 'dob', 'license'];
//   // for (var i in requiredFields) {
//   //   console.log("field = ", field);
//   //   if (!req.body[field]) {
//   //     console.log("Got request with missing field: " + field);
//   //     res.status(400);
//   //     res.json({message: "Missing fields"});
//   //   }
//   // }
//   handler.addUser(req.body, req.params.type, req.session, res);
// });

//create user with images

router.post('/:type/register', upload.array('images[]', 5), function (req, res) {
  var user = req.body;
  var img = req.files.map(function (i) {
    var arr = i.path.split("/")

    arr.splice(0, 1);
    return arr.join("/");

  });
  user.photos = img;

  handler.addUser(user, req.params.type, req.session, res);
});


// Find user by ID
router.get('/:userId', function (req, res) {
  if (!req.params.userId.toString().match(/[0-9]+/g)) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    handler.findUserById(req.params.userId, req.session, res);
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

