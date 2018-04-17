const express = require('express');

const path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();


// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var uploadsDir = __dirname + "/uploads/";
app.use(express.static(uploadsDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var sess = ({

  resave: true,

  saveUninitialized: true,
  cookie: {maxAge: 60000},
  name: "TSessionID"

});

if (app.get('env' === 'production')) {

  sess.secret = process.env.SESSION_SECRET;

} else {

  sess.secret = "T0rqS3cre+";

}

app.use(session(sess));

var checkSession = function (req, res, next) {
  var unauthURLS = ["/api/user/login", "/api/user/customer/register", "/api/user/renter/register"];
  if (unauthURLS.indexOf(req.path) == -1) {
    //check session here
    if (req.session.user == undefined) {
      //res.status(401).json({unauthorized: true});
      next();
    } else {
      next();
    }
  } else {
    next();
  }
};

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var userModel = require('./server/models/user/user.model.server.js')();

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    userModel.findUserByCredentials(username, password).then(
      function (user) {
        if (user.username === username && user.password === password) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      },
      function (err) {
        if (err) {
          return done(err);
        }
      }
    );
  }
));


passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  userModel.findUserById(id).then(function (user) {
    done(null, user);
  }).catch(function(err){
    done(err, null);
  });
});


app.use(checkSession);
app.use(passport.initialize());
app.use(passport.session());

var services = require("./server/app.js")(app);

app.use('/api', services);

app.get('*', function (req, res) {
  res.sendFile(distDir + '/index.html');
});


// Start the app by listening on the default
// Heroku port
var port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port " + port);

