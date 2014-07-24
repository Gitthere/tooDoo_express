var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jade = require('jade');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
mongoose.connect('mongodb://toodoo_express:toodoo_express@ds027709.mongolab.com:27709/toodoo_express');

var Schema = mongoose.Schema;
var TaskItemSchema = new Schema( {
  title: String,
  notes: String
});

var Task = mongoose.model('tasks', TaskItemSchema);

app.set('views', __dirname + '/templates/');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



//LIST
  //GET /tasks  //lists all tasks
app.get('/tasks/', function (req,res){ //need '/' before tasks for server side
  //res.render('tasks/list.jade');//'/' after jade not necessary.  this will
  //render the list.jade content in layout.jade
  Task.find(function (err, tasks) {
    var options = {//create object for array of objects, array will not work
      tasksCollection: tasks //set property 
    };
    //console.log(options);//check if tasks logging
    
    res.render('tasks/list.jade', options);//renders list of tasks
  });
});


//EDIT
  //GET /tasks/:id/edit
app.get('/tasks/:id/edit', function (req,res) {//allows editing of tasks
  res.render('tasks/edit.jade');//'/' after jade not necessary.  this will
  //render the edit.jade content in layout.jade
});


//NEW
  //GET /tasks/:id
app.get('/tasks/new', function (req,res) {//allows user to enter new task
  res.render('tasks/new.jade');//'/' after jade not necessary.  this will
  //render the new.jade content in layout.jade
});


//SHOW
  //GET /tasks/:id
app.get('/tasks/:id', function (req,res) {//allow visitor to reach this id
  var id = req.params.id;
  Task.findById(id, function (err, task) {
    res.send(task);
  })
});





//CREATE (api request for params)
  //POST /tasks

app.post('/tasks', function (req,res) {
  // console.log(req.body); //check if server get messagen from client

  var task = new Task({
  title : req.param('title'),  //var bodyParser = require('body-parser');npm install -S body-parser
  notes : req.param('notes')
  })
  // console.log(task); // check b4 saving
  task.save(function(wert, task) {
    if(wert) { res.send(500, wert); }

    res.redirect('/tasks/');
  })
})









//UPDATE
  //PUT /tasks/:id(long number)
  // app.put('/tasks/:id', function(req,res) {
  //   var id = req.param('id');
  //   console.log(req.param(id))

  //   taskItem.findOne({_id: id(long number)}, function() {
  //     //body...
  //   })
  // })


//DELETE
  //DEL



app.listen(3000);

