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
  if (!req.user) {
    res.status(403).json({status: "Forbidden"});
  } else {
    var car = req.body;
    var img = req.files.map(function (i) {
      var arr = i.path.split("/");

      arr.splice(0, 1);
      return arr.join("/");

    });
    car.photos = img;

    handler.addNewCar(car, req.user, res);
  }
});

// Search and filter cars
router.post('/searchCar', function (req, res) {
  var search = req.body;
  handler.findCars(search, res);
});

router.post('/approveCar', function (req, res) {
  handler.approveCar(req.body, res);
});

router.post('/declineCar', function (req, res) {
  handler.declineCar(req.body, res);
});

router.get('/unapprovedCars', function (req, res) {
  handler.getUnapprovedCars(res);
});

router.post('/:cid/book', function (req, res) {
  if (!req.user) {
    res.status(403).json({status: "Forbidden"});
  } else {
    handler.bookCar(req.body, req.user, req.body.startDate, req.body.endDate, req.body.pickupLocation, res);
  }
});

// Get Car by ID
router.get('/:cid', function (req, res) {
  handler.findCarById(req.params.cid, res);
});



module.exports = router;
