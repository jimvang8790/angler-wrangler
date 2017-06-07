var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Item = require('../models/user.model').item;

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

// get items from database
router.get('/getItems', function(req, res) {
    console.log('is this get rounter working');

    console.log('req.user is', req.user);
    // server side is grabing items from the database with the .find
    // .find userId: req.user._id finding everyting that belong to the current user.
  Item.find({'userId': req.user._id}, function(err, results) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }// end if
    else{
      console.log('successful get items ->', results);
      res.status(200).send(results);
    }// end else
  });// end Item.find
});// end router.get

// delete a catch/fish from database
router.delete('/remove', function(req, res) {
  var fishIdToDelete = req.query.id;
  Item.remove({ _id: fishIdToDelete }, function(err) {
    if (err) {
      console.log('Error removing from database', err);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200);
    }
  });
});//end delete

// update a catch/fish from database
router.put('/update', function(req, res) {
  console.log('updating logs', req.body);
  var fishToBeUpdate = Item(req.body);
  console.log('this is Item to be update->', Item);
  Item.findByIdAndUpdate(
    req.body._id,
    {$set:
      {imgUrl: req.body.imgUrl,
      type: req.body.type,
      size: req.body.size,
      weight: req.body.weight,
      date: req.body.date,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      description: req.body.description}
    }, function(err) {
      if (err) {
        console.log('Error removing from database', err);
        res.sendStatus(500);
      }
      else {
        res.sendStatus(200);
      }
    });
});// end router.put

// exports
module.exports = router;
