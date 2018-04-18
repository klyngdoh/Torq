var express = require('express');
var handler = require('../handlers/trip.service.handler.js');
var router = express.Router();


router.get('/pendingApprovals', function(req, res) {
  if (!req.user) {
    res.status(403).json({status: "Forbidden"});
  } else {
    handler.getPendingApprovals(req.user._id, res);
  }
});

module.exports = router;
