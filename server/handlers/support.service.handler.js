var supportModel = require('../models/support/support.model.server')();

module.exports = {

  addMessage: function (body, res) {
    var support = body;

    supportModel.addMessage(support).then(function (result) {
      res.json(result);
    }).catch(function (err) {
      console.log(err);
      res.status(500);
      res.json({message: err});
    });
  },

  findUnreadMessages: function (res) {
    supportModel.findUnreadMessages().then(function (result) {
      res.json(result);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  },

  findReadMessages: function (res) {
    supportModel.findReadMessages().then(function (result) {
      res.json(result);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  },

  viewMessage: function(body, res) {
    var support = body;
    supportModel.viewMessage(support).then(function (result) {
      res.json(result);
    }).catch(function (err) {
      res.status(500);
      res.json({message: err});
    });
  }
};
