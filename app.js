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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
})
);





//check if our routes are working
app.get('/', function(request, response){
  response.send("You're in my library");
});

//READ ALL
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
     //response.JSON.stringify(books);
  }
});
});


//READ ONE
//retrieve one book only with ID 581ffd17fad4a0d4d39261fb
app.get('/books/:id', function(request, response){
  console.log('Getting the book you want..');
  Book.findOne({
    _id: request.params.id
  })
  .exec(function(err,book){
    if (err) {
      response.send('Fuckin error man');
    }else {
      console.log(book);
    //response.setHeader('Content-Type', 'text/plain');
    //response.writeHead(200, { 'Content-type': 'text/plain'});
    //response.write('You requested the book: \n');
    response.json(book);
    }
  });
});


//CREATE - USING POSTMAN
//add post routes
/*
app.post('/book', function(request, response){
  var addBook = new Book();
  addBook.title = request.body.title;
  addBook.Author =  request.body.Author;
  addBook.Publisher = request.body.Publisher;
  addBook.PublishingDate = request.body.PublishingDate;
  addBook.NYTBestseller = request.body.NYTBestseller;
  addBook.Category = request.body.Category;

  addBook.save(function(err,book){
    if (err){
      response.send('Error adding book');
    } else {
    console.log(book);
    response.send(book);
  }
  });
});

//CREATE BOOK 2 - USING POSTMAN
//add a new book
app.post('/book2', function(request, response){
  Book.create(request,body,function(err,book){
    if (err){
      response.send('Error adding book');
    } else {
    console.log(book);
    response.send(book);
  }
});
});
*/

/*
//CREATE - USING POSTMAN
app.post('/newbook', function(request, response){
  addBook.save(function(err,book){
    if (err){
      response.send('Error adding book');
    } else {
    console.log(book);
    response.send(book);
    }
  });
}
*/

/*
//CREATE
//addbook from here
var addBook = new Book({
  title: 'Lolita',
  Author: 'Vladimir Nakobov',
  ISBN: '0003',
  Publisher: 'Putnam',
  PublishingDate: '1958',
  NYTBestseller: 'true',
  Category: 'Fiction'
  });

  addBook.save(function(error) {
       console.log("Your just saved " + addBook.title );
   if (error) {
       console.error(error);
    }
   });
*/

/*
//UPDATE
//get a book and update here
Book.findOneAndUpdate({ Publisher: 'Putnam' }, { Publisher: 'Putnam of Russia' },
  function(err, book) {
    if (err) throw err;

  // we have the updated user returned to us
  console.log('Successfully updated ' + book.title);
  //console.log(book);
});
*/


/*
//UPDATE
//update books - using POSTMAN
app.put('./book/:id', function(request, response){
  Book.findOneAndUpdate({
    _id: request.params.id
  },
  {$set: {title:request.body.title}},
    {upsert: true},
      function(err, newBook){
        if (err){
        console.log('Error updating book');
      } else {
        console.log(newBook);
        response.send(2014);
    }
  });
});
*/

/*
//DELETE
//delete a book -using POSTMAN
app.delete('./book/:id', function(request, response){
  Book.findOneAndRemove({
    _id: request.params.id
  }, function(err, book){
    if (err){
    response.send('Error deleting book');
    } else {
      console.log(book);
      response.status(2014);
  }
});
});
*/

/*
//DELETE from here
// add a book first with kurt as the author or change key below
Book.findOneAndRemove({ Author: 'Kurt Vonnegut' },
function(err) {
  if (err) throw err;
  // we have deleted the user
  console.log('Successfully deleted!');
});
*/


//check if server is up
app.listen(port, function() {
  console.log('App listening on port ' + port);
});
