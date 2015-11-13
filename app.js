'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');


// set up mongoose
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/messageboard');

var app = express();

app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/messages', require('./routes/messages'));

// 404 HANDLER
app.use(function(req, res){
  res.status(404).send('404 File Not Found')
})

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
