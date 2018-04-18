var tripModel = require('../models/trip/trip.model.server.js')();
module.exports = {
  getPendingApprovals: function (renterId, res) {

    tripModel.getPendingApprovals(renterId).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({error: err});
    });

  }
}
