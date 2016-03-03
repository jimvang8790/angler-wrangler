var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req,res){
    console.log(req.isAuthenticated());

    if(req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.send(false);
    }

});

module.exports = router;