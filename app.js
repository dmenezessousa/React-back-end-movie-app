var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require("cors");
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/usersRouter');
var moviesRouter = require('./routes/movies/moviesRouter');

var app = express();

mongoose.connect(process.env.MONGO_DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("MongoDB Connected");
}).catch((e)=>{
  console.log(e);
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/movies', moviesRouter);

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
  res.json({message: "error", err: err.message});
});

module.exports = app;
