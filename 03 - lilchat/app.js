var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var router = express.Router();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post('/jason/msg', function(req, res){
	fs.readFile('database.json', 'utf-8', function(err, data){
  		filedata = JSON.parse(data);
  		filedata.messages.push(req.body);
  		fs.writeFile('database.json', JSON.stringify(filedata), 'utf-8', function(){
  			console.log('written')
  			res.status(200);
  		})
 	});

});

app.get('/jason', function(req, res) {
	let filedata;
	fs.readFile('database.json', 'utf-8', function(err, data){
  		filedata = data;
  		res.json(filedata);
  		res.status(200);
 	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
