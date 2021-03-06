var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var routes = require('./routes/index');
var admin = require('./routes/admin');
var coco = require('./routes/coco');
var api = require('./routes/api');
var ajax = require('./routes/coco-ajax');
var developer = require('./routes/develop');

var RedisStore = require('connect-redis')(session);


var app = express();

app.use(session({ secret: 'coco', cookie: { maxAge: 600000 }}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); //替换文件扩展名ejs为html


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/admin', admin);
app.use('/developer', developer);
app.use('/coco', coco);
app.use('/api', api);
app.use('/ajax', ajax);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.ejs', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.ejs', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
