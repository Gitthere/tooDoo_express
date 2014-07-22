var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://toodoo_express:toodoo_express@ds027709.mongolab.com:27709/toodoo_express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var jade = require('jade');

//must come AFTER app.use(bodyParser)
app.set('views', __dirname + '/templates/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get('/tasks/', function (req,res){
  console.log('test res render in app.get');
  res.render('tasks/list.jade');
  //res.send('hello world');
  //res.send('tasks/list.jade');//worked with hello world, now not working.  
  //how does tasks/list.jade work?  what is jade layout and what is relation to this?
});

app.get('/tasks/edit', function (req,res) {
  res.render('tasks/edit.jade');
});

app.get('/tasks/new', function (req,res) {
  res.render('tasks/new.jade');
});

// res.render('layout.jade', function() { doesn't work like this, needs to be used with app.get
//   console.log('check res render function');
// }); //is res.render to be used with app.get or app.set?
    





//LIST
  //GET /tasks
  // app.get('/', function (req,res){

  // });
  


//NEW
  //GET /tasks/:id





//SHOW
  //GET /tasks/:id





//CREATE (api request for params)
  //POST /tasks
    app.post('/tasks', function(req,res) {
      var task = new TaskItem({
      title : req.param('title'),  //var bodyParser = require('body-parser');npm install -S body-parser
      notes : req.param('notes')

      })
      task.save(function(wert, task) {
        if(wert) { res.send(500, wert); }

        res.redirect('/');
      })
    })




//EDIT
  //GET /tasks/:id




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

