var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongodb://toodoo_express:toodoo_express@ds027709.mongolab.com:27709/toodoo_express;
// override with POST having ?_method=DELETE app.use(methodOverride('_method'));
var bodyParser = require('body-parser');
var jade = require('jade');

//must come AFTER app.use(bodyParser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var methodOverride = require('method-override');

app.set('views', __dirname + '/templates');
    


app.get('/', function (req,res){
  res.send('hello wonka');
});


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

