const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');

const routes_index = require('./src/server/routes/index');
const routes_api = require('./src/server/routes/api');

//const port = process.env.PORT || '3000';
const app = express();

// view engine setup
//app.set('view engine', 'html');
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', routes_index);
app.use('/api', routes_api);
//app.use('/home', routes_index);
//app.use('*', routes_index);
app.get('*', (req, res) => {
  res.sendFile('./src/dist/index.html');//, {'./'}
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
  res.send();
  //res.render('error');
});

module.exports = app;
