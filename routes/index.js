var express = require('express');
var router = express.Router();


//HOME PAGE
router.get('/',function(req, res) {
  res.render('index.jade');//do you want to sign in?
});


//LOGIN - renders login form
router.get('/login', function (req,res) {
  res.render('users/login.jade');
});


//LOGOUT
router.get('/logout', function (req, res) {
  req.session.user = undefined;
  res.redirect('/login');

});

module.exports = router;

