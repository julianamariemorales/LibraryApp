var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//get the book model module
var Book = require('./Book.model');

//my port
var port = 8080;

//set db
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

//mongoose.connect(db);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
   console.log('Connection to mongoose db succeeded');
});

//check if our routes are working
app.get('/', function(request, response){
  response.send("You're in my library");
});

//get all my books added in mongo shell
app.get('/books', function(request, response){
  console.log('Getting all the books in your library...');
  Book.find({})
  .exec(function(err,books){ //books is a variable
    if (err){
    response.send('Error has occured');
  } else {
    console.log(books);
    response.json(books);
  }
});
});


//check if server is up
app.listen(port, function() {
  console.log('App listening on port ' + port);
});
