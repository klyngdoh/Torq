var connectionString = 'mongodb://127.0.0.1:27017/torq'; // for local


 if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
   var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
   var password = process.env.MLAB_PASSWORD_WEBDEV;
   connectionString = 'mongodb://' + username + ':' + password;
   connectionString += '@ds149324.mlab.com:49324/heroku_qlnqp6m6'; // use yours
 }

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
