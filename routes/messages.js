'use strict';

var express = require('express');
var router = express.Router();


var Message = require('../models/message');


router.get('/', function(req, res) {
  Message.find({}, function(err, messages) {
    // sort - newest messages on top
    messages.sort((msg1, msg2) => msg2.time - msg1.time);
    var moment = require('moment');
    res.status(err ? 400 : 200).render("index", {messages: messages, moment: moment});
  });
});

// not used currently, but good to have nonetheless
router.get('/all', function(req, res) {
  Message.find({}, function(err, messages) {
    res.status(err ? 400 : 200).send(err || messages);
  });
});

router.post('/', function(req, res) {
  var message = new Message(req.body);
  message.save(function(err, savedMessage) {
    res.status(err ? 400 : 200).send(err || savedMessage);
  });
});

router.put('/', function(req, res) {
  Message.findByIdAndUpdate(req.body._id, req.body, function(err, message) {
    res.status(err ? 400 : 200).send(err || 'updated!');
  });
});

router.delete('/', function(req, res) {
  Message.findByIdAndRemove(req.body._id, function(err, message) {
    res.status(err ? 400 : 200).send(err || 'deleted!');
  });
});


module.exports = router;
