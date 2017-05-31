var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var User = require('../models/user.model');
var Picture = require('../models/user.model').picture;

//sending data to the database
router.post('/', function (req, res){
  console.log('In post route for picture');

  console.log('req.user is for picture', req.user);

  // collection structure
  var picturesDB = new Picture({
    userId: req.user._id,
    picture: req.body.picture,
  });

  // saving pictures to the database
  console.log('this is req.body:', req.user, req.body);
  picturesDB.save().then(function(){
    res.sendStatus(200);
  });// ends itemsDB
}); // end rounter.post

module.exports = router;
