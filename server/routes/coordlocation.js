var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user.model');
var Coordlocation = require('../models/user.model').coordlocation;

//sending data to the database
router.post('/', function (req, res){
  console.log('In post route for location');

  // collection structure
  var coordlocationsDB = new Coordlocation({
    userId: req.user._id,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  // saving coordlocation to the database
  console.log('this is req.body:', req.user, req.body);
  coordlocationsDB.save().then(function(){
    res.sendStatus(200);
  });// ends coordlocationsDB
}); // end rounter.post

module.exports = router;
