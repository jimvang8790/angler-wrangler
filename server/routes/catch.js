var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user.model');
var Item = require('../models/user.model').item;

//sending data to the database
router.post('/', function (req, res){
  console.log('In post route in items');

  // collection structure
  var itemsDB = new Item({
    userId: req.user._id,
    imgUrl: req.body.imgUrl,
    type: req.body.type,
    size: req.body.size,
    weight: req.body.weight,
    date: req.body.date,
    location: req.body.location,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description,
  });

  // saving items to the database
  console.log('this is req.body:', req.user, req.body);
  itemsDB.save().then(function(){
    res.sendStatus(200);
  });// ends itemsDB
}); // end rounter.post

module.exports = router;
