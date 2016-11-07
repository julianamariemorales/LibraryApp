/* jshint node: true */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  Author: String,
  ISBN: {
    type: Number,
    unique: true,
  },
  Publisher: String,
  PublishingDate: Date,
  NYTBestseller: Boolean,
  Category: String
});


 //mongoose.connect('mongodb://localhost/test');
 module.exports =mongoose.model('Book', BookSchema);
