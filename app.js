var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var npid = require('npid');
var fs = require('fs');
var debug = require('debug')('veesee');
var api = require('./routes/api');
var home = require('./routes/home');
var login = require('./routes/login');

var app = express();

/*TODO: Favicon */
//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/login', login);
app.use('/api', api);


app.set('port', process.env.PORT || 3030);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    // respond with html page
    if (req.accepts('html')) {
        /*TODO: handle 404 errors here */
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

/// error handlers
if(app.get('env') === 'production') {
    /*TODO: fix this for launch */
    /*
    try {
        var pid = npid.create('/var/run/pmfat.pid');
        pid.removeOnExit();
    } catch (err) {
        console.log('>> app.js - npmid error : ',err);
        process.exit(1);
    }
    */
}


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(app.get('port'), function() {
  console.log('VeeSee server listening on port ' + server.address().port)
});

