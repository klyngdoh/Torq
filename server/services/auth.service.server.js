var express = require('express');
// var handler = require('../handlers/user.service.handler.js');
var router = express.Router();
var passport = require('passport');


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /api/auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook'));


// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureFlash: 'Invalid username or password.' }),
  function(req, res) {
    res.json(req.user);
  });

module.exports = router;
