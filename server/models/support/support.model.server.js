var supportSchema = require('./support.schema.server');
var session = require('express-session');
const db = require('../models.server.js');

module.exports = function() {

  supportSchema.statics.addMessage = function (support) {
    var Support = db.model('Support', supportSchema);
    var s = new Support;
    s.name = support.name;
    s.email = support.email;
    s.subject = support.subject;
    s.message = support.message;
    s.viewed = support.viewed;
    return s.save();
  };

  supportSchema.statics.findUnreadMessages = function(){
    var Support = db.model('Support', supportSchema);
    return Support.find({viewed: "false"});
  };

  supportSchema.statics.findReadMessages = function(){
    var Support = db.model('Support', supportSchema);
    return Support.find({viewed: "true"});
  };

  supportSchema.statics.viewMessage = function(support) {
    var Support = db.model('Support', supportSchema);
    var s = new Support;
    s._id = support._id;
    s.name = support.name;
    s.email = support.email;
    s.subject = support.subject;
    s.message = support.message;
    s.viewed = "true";

    return Support.update({"_id" : support._id}, s);
  };

  supportSchema.statics.getReadCount = function () {
    var Support = db.model('Support', supportSchema);
    return Support.find({viewed:"true"}).count();
  };

  var autoIncrement = require('mongoose-auto-increment');
  autoIncrement.initialize(db);
  supportSchema.plugin(autoIncrement.plugin, 'Support');

  //return
  return db.model('Support', supportSchema);
};
