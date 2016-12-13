/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = process.env.PORT || 8000;
var path = require('path');


var environment = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// var filespath = require("path").join(__dirname, "index.html");
// console.log(filespath);

switch (environment) {
  case 'build':
  	console.log('environment')
    app.use(express.static(path.join(__dirname, "/")));

	// Any deep link calls should return index.html
	app.use('/*', express.static(path.join(__dirname, "index.html")));
    break;
  default:
  	console.log('development');
    app.use(express.static(path.join(__dirname, "/")));

	// Any deep link calls should return index.html
	app.use('/*', express.static(path.join(__dirname, "index.html")));
    break;
}


app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
