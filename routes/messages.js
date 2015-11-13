'use strict';

var express = require('express');
var router = express.Router();


var Message = require('../models/message');


router.get('/', function(req, res) {
  Message.find({}, function(err, messages) {
    // sort - newest messages on top
    messages.sort((msg1, msg2) => msg2.time - msg1.time);
    res.render("index", {messages: messages});
  });
});


router.get('/all', function(req, res) {
  Message.find({}, function(err, messages) {
    res.send(messages);
  });
});

router.post('/', function(req, res) {
  var message = new Message(req.body); // uppercase is the 'message class'
  message.save(function(err, savedMessage) {
    res.send(savedMessage);
  });
});

router.put('/', function(req, res) {
  Message.findByIdAndUpdate(req.body._id, req.body, function(err, message) {
    res.send('updated!');
  });
});

router.delete('/', function(req, res) {
  Message.findByIdAndRemove(req.body._id, function(err, message) {
    res.send('deleted!');
  });
});


module.exports = router;
