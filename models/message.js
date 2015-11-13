'use strict';

var mongoose = require('mongoose');

// define the schema
var messageSchema = mongoose.Schema({
  author: { type: String, required: true },
  time: { type: Number, required: true, default: Date.now() },
  message: String
});

// mongoose takes this and makes and makes a collection 'cars'
var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
