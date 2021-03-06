var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskItemSchema = new Schema( {
  title: String,
  notes: String,
  userId: String,
  checked: Boolean
});
var Task = mongoose.model('tasks', TaskItemSchema);

router.use(function(req,res,next) {
  if(!req.session.user){
    res.redirect('/login');
    return;
  }
  res.locals.name = req.session.user.name;
  next();
});


//PERTAINING TO TASKS************
//LIST
  //GET /tasks  //lists all tasks
router.get('/', function (req,res){ //need '/' before tasks for server side
  if (req.session.user !== undefined) {
    Task.find({userId: req.session.user._id}, function (err, tasks) {
      console.log(tasks);
      console.log(req.session.user._id);
      console.log(req.session.user);
      var options = {//create object for array of objects, array will not work
        tasksCollection: tasks
        // userName: req.session.user.name//app.locals // needmiddleware to be visible on every page
      };
      //console.log(options);
      
      res.render('tasks/list.jade', options);
    });
  } else {//not logged in
    res.redirect('/users/login');
  }
});



//NEW  //shows user form to create new task
  //GET /tasks/:id
router.get('/new', function (req,res) {//allows user to enter new task
  res.render('tasks/new.jade');//'/' after jade not necessary.  this will
});



//CREATE (api request for params)
  //POST /tasks

router.post('/', function (req,res) {
  // console.log(req.body); //check if server get messagen from client
  console.log(req.body);
  console.log(req.session.user._id);
  var task = new Task({
    title : req.param('taskTitle'),  //var bodyParser = require('body-parser');npm install -S body-parser
    notes : req.param('taskNotes'),
    userId: req.session.user._id //need to log in to get req.session.user data
  });
  // console.log(task); // check b4 saving
  task.save(function(wert, task) {
    if(wert) { res.send(500, wert); }

    res.json(task);
  });
});


//SHOW individual task
  //GET /tasks/:id
router.get('/:id', function (req,res) {//allow visitor to reach this id
  var id = req.params.id;//create object to be accessed
  Task.findById(id, function (err, task) {//finds the one task that is clicked
    //console.log(task);
    res.render('tasks/show.jade', {task : task});
  })
});


//EDIT //shows user the edit form, then Update will handle change
  //GET /tasks/:id/edit
router.get('/:id/edit', function (req,res) {//allows editing of tasks
  //finds task to be edited by id
  Task.findById(req.params.id, function (err, task) {
    //'/' after jade not necessary.  this will
    //render the edit.jade content in layout.jade
    res.render('tasks/edit.jade', {task : task});//calls jade template, automates res.send
  });
});


//CHECKBOX
router.post('/completed/:id', function (req,res) {
  Task.findById(req.param('id'), function(err,task) {
    task.checked = !task.checked;
    task.save(function(err,t) {
      if (err) res.send(500, err);
      res.redirect('/tasks');
    });
  });
});


// This enables app.put. Must install node module
// must come AFTER app.use(bodyParser)
// // override with POST having ?_method=DELETE
// app.use(methodOverride('_method'));



//UPDATE  //update the selected task and PUT in
//PUT /tasks/:id(long number)
router.put('/:id', function (req,res) {
  var id = req.params.id;//need to create object
  Task.findOneAndUpdate(
    {_id: id}, 
    {
      title: req.param('taskTitle'),
      notes: req.param('taskNotes')
    },
    function (err, task) {
      res.redirect('/tasks');
    }
  );   
})





//DELETE
  //DEL
router.delete('/:id', function (req,res) {
  //console.log('deletecheck');
  Task.findByIdAndRemove(req.params.id, function (err,task) {
    if (err) {
      res.send(500);
    }
    res.send(200);
  });
});
//PERTAINING TO TASKS************


module.exports = router;