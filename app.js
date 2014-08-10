var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var index = require('./routes/index.js');
var users = require('./routes/users.js');
var tasks = require('./routes/tasks.js');
var jade = require('jade');
var methodOverride = require('method-override');
var session = require('express-session')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://toodoo_express:toodoo_express@ds027709.mongolab.com:27709/toodoo_express');


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
app.use('/tasks', tasks);


app.listen(3000);

