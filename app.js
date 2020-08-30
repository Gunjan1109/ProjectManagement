var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const mongoose = require("mongoose")
var url =
"mongodb+srv://gunjanNCU:7210476954@projectmanagement-tw5om.mongodb.net/test?retryWrites=true&w=majority"
mongoose.Promise = global.Promise
// Connecting to the database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to the database")
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err)
    process.exit()
  })

var indexRouter = require('./routes/index.route');
var ownerRouter = require('./routes/owner.route')
var memberRouter = require('./routes/member.route')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("Gunjan"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/member' , memberRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
