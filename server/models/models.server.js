const connectionString = 'mongodb://127.0.0.1:27017/torq'; // for local
//  if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
//    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
//    var password = process.env.MLAB_PASSWORD_WEBDEV;
//    connectionString = 'mongodb://' + username + ':' + password;
//    connectionString += '@ds157268.mlab.com:57268/heroku_nh37fqq4'; // use yours
//  }

const mongoose = require("mongoose");

// get connection for movies database
var db = mongoose.createConnection(connectionString);
db.then(function() {
  console.log("connection success");
}).catch(function(err) {
  console.log("connection error");
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

module.exports = db;
