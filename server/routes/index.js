var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.post('/',
        passport.authenticate('local', {
            successRedirect: '/views/user.html',
            failureRedirect: '/views/failure.html'
        })
);

router.get("/*", function(req, res, next){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;