var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var npid = require('npid');
var fs = require('fs');
var debug = require('debug')('veesee');
var api = require('./routes/api');

var app = express();

/*TODO: Favicon */
//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
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

var onExit = function() {
    if(app.get('env') === 'production') {
        try {
            fs.unlink('/var/run/pmfat.pid', function() {
                console.log('>> app.js : removed /var/run/pmfat.pid before exit');
            });
        } catch(e) {
            console.log('>> app.js : fs error while trying to remove /var/run/pmfat.pid before exit : ', e);
        }    
    }
    console.log('>> app.js : Sorry to see you go. Run me again soon.');
    
};

// remove /var/run/pmfat.pid file on production, before exit
/*TODO: fix this for launch  */

//process.on('exit', onExit);
//process.on('uncaughtException', onExit);
//process.on('SIGTERM', onExit);
//process.on('SIGINT', onExit);


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

