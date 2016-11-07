var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//get the book model module
var Book = require('./Book.model');

//set db
//var db = 'mongodb://localhost/test';
//mongoose.connect(db);
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
   console.log('Connection to mongoose db succeeded');
});



//my port
var port = 8080;

//check if server is up
app.listen(port, function() {
  console.log('App listening on port ' + port);
});
