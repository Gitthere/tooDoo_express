var express = require('express');
var app = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema( {
  name: String,
  email: String,
  password: String
});
var User = mongoose.model('users', UserSchema);



//REGISTER - renders registration form
app.get('/register', function (req,res) {
  res.render('users/register.jade');
});



//writes user info to db
app.post('/usersave', function (req,res) {
  console.log('im here');
  //console.log(req.body);  //check to see if server got message from client
  var user = new User({
    name: req.param('userName'),
    email: req.param('userEmail'),
    password: req.param('userPassword')
  });
  console.log(user);  //check b4 saving
  user.save(function(err, user) {
    if(err) { res.send(500, err); }
    res.redirect('/tasks/new')
  });
});


//LOGIN VERIFICATION - verifies login info and checks password
app.post('/login', function (req,res) {
  if (req.param('userEmail') === '') {//checks if form empty
    res.render('users/login.jade', {errors : 'Incorrect Email'});
    return;
  };

  if (req.param('userPassword') === '') {
    res.render('users/login.jade', {errors : 'Incorrect Password'});
    return;
  }

  User.findOne({'email': req.param('userEmail')}, function (wert, users) {
    if (users !== null) {//user is found in db
      //checks to see if password of email entered matches db pswd
      if (req.param('userPassword') === users.password) {
        console.log('match');
        req.session.user = users;//store in session
        res.redirect('/tasks/');
      } else {
        // res.redirect('/users/login');
        res.render('users/login.jade', {errors : 'Either the email or password is incorrect, please try again.'});
      } 
    } else {//user is not found in db
      res.render('users/login.jade', {errors : 'Either the email or password is incorrect, please try again.'});
    }
    
  });
});




module.exports = app;