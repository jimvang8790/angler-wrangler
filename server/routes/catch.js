var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user.model');
var Item = require('../models/user.model').item;

//sending data to the database
router.post('/', function (req, res){
  console.log('In post route');

  console.log('req.user is', req.user);

  // collection structure
  var itemsDB = new Item({
    userId: req.user._id,
    img: req.body.img,
    type: req.body.type,
    size: req.body.size,
    weight: req.body.weight,
    location: req.body.location,
    description: req.body.description,
  });

  // saving items to the database
  console.log('this is req.body:', req.user, req.body);
  itemsDB.save().then(function(){
    res.sendStatus(200);
  });// ends itemsDB
}); // end rounter.post

module.exports = router;
