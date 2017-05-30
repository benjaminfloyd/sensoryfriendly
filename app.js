// Standard stuff
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// var db = require('./db');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');

var hbs = require('hbs');
app.set('view engine', 'hbs');

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var indexController = require("./routes/indexController.js");
app.use('/', indexController);

var usersController = require("./routes/usersController.js");
app.use('/users', usersController);

// Mongoose stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensoryfriendly');

// Now that we're connected, let's save that connection to the database in a variable.
var db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function(err){
  console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function() {
  console.log("database has been connected!");
});

app.listen(4000, function(){
  console.log("app listening on port 4000");
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
// get public static