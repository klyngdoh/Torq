var express = require('express');
var handler = require('../handlers/support.service.handler');
var router = express.Router();
var passport = require('passport');

// Create user
router.post('/messages', function (req, res) {
  handler.addMessage(req.body, res);
});

router.get('/unread', function (req, res) {
    handler.findUnreadMessages(res);
});

router.get('/read', function (req, res) {
  handler.findReadMessages(res);
});

router.post('/view', function (req, res) {

  handler.viewMessage(req.body, res);
});

module.exports = router;

