'use strict';

var mongoose = require('mongoose');

// define the schema
var messageSchema = mongoose.Schema({
  author: String,
  time: Number,
  message: String
});

// mongoose takes this and makes and makes a collection 'cars'
var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
