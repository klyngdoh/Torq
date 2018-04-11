var carModel = require('../models/car/car.model.server.js')();
module.exports = {

  addNewCar: function(car, res) {
    carModel.addNewCar(car).then(function(data) {
      res.json(data);
    }).catch(function(err){
      res.status(500).json({error: err});
    });
  }
}
