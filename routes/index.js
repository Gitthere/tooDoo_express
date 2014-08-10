var express = require('express');
var router = express.Router();



router.get('/',function(req, res) {
  res.send('Index Page');//do you want to sign in?
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

