// Node libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

// Config Setup
const config = require('./config');

// Routes
var indexRouter = require('./routes/index');
var lessonsRouter = require('./routes/lessons');
var studentsRouter = require('./routes/students');
var teachersRouter = require('./routes/teachers');
var feedbacksRouter = require('./routes/feedbacks');
var classesRouter = require('./routes/classes');
var enrollmentRouter = require('./routes/enrollment')

// Database setup
var uri = `${config.MONGO_URI}/${config.DB_NAME}`
var connect = mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

connect.then((db) => {
  console.log('Koneksi dengan database berhasil!');
}, (err) => {
  console.error(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/lessons', lessonsRouter);
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);
app.use('/feedbacks', feedbacksRouter);
app.use('/classes', classesRouter);
app.use('/enrollment', enrollmentRouter)

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