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

router.post('/:tid/changeStatus', function(req,res) {
  if (!req.user) {
    res.status(403).json({status: "Forbidden"});
  } else {
    handler.changeTripStatus(req.params.tid, req.body.status, res);
  }
});

router.get('/trips', function(req, res) {
  if (!req.user) {
    res.status(403).json({status: "Forbidden"});
  } else {
    handler.getTrips(req.user, res);
  }
});

module.exports = router;
