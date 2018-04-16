var express = require('express');
var handler = require('../handlers/car.service.handler.js');
var router = express.Router();
var crypto = require('crypto');
var multer = require('multer');

var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads/cars/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      var name = raw.toString('hex') + '-' + Date.now() + '.' + file.mimetype.split('/')[1];
      console.log("Storing file, ", name);
      cb(null, name);
    })
  }
});

var upload = multer({storage: storage});


// Add new car
router.post('/addCar', upload.array('images[]', 5), function (req, res) {
  var car = req.body;
  var img = req.files.map(function (i) {
    var arr = i.path.split("/")

    arr.splice(0, 1);
    return arr.join("/");

  });
  car.photos = img;

  handler.addNewCar(car, req.session, res);
});

// Search and filter cars
router.post('/searchCar', function (req, res) {
  var search = req.body;
  handler.findCars(search, res);
});


// Get Car by ID
router.get('/:cid', function (req, res) {
  handler.findCarById(req.params.cid, res);
});


module.exports = router;
