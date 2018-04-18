module.exports = function(app) {
  var express = require('express');
  var router = express.Router();

  var supportRouter = require("./services/support.service.server.js");
  router.use('/support', supportRouter);

   var userRouter = require("./services/user.service.server.js");
   router.use('/user', userRouter);

  var carRouter = require("./services/car.service.server.js");
  router.use('/car', carRouter);

  var tripRouter =  require("./services/trip.service.server.js");
  router.use('/trip', tripRouter);
  //
  // var widgetRouter = require("./services/widget.service.server.js");
  // router.use('/widget', widgetRouter);

  return router;
};
