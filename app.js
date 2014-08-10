var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var index = require('./routes/index.js');
var users = require('./routes/users.js');
var jade = require('jade');
var methodOverride = require('method-override');
var session = require('express-session')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://toodoo_express:toodoo_express@ds027709.mongolab.com:27709/toodoo_express');






var TaskItemSchema = new Schema( {
  title: String,
  notes: String,
  userId: String,
  checked: Boolean
});

var Task = mongoose.model('tasks', TaskItemSchema);



app.set('views', __dirname + '/templates/');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret : 'sauce'}));
//middleware*******************
app.use('/', index);
app.use('/users', users);


//USERS*************

// router.use(function(req,res,next) {
//   if(!req.user){
//     res.redirect('/login');
//   }
//   next();
// });



//LOGOUT
app.get('/logout', function (req, res) {
  req.session.user = undefined;
  res.redirect('/users/login');

});





//renders login page to get users to login page if incorrect route entered
app.get('/', function (req, res) {
  res.redirect('/users/login');
});


// //always use last.  catch all that handles requests that do not have specific route entered
// app.get('*', function (req, res) {
//   res.redirect('/users/login');
// });


app.listen(3000);

