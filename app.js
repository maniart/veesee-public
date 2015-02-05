    // imports
var express = require('express')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , npid = require('npid')
  , fs = require('fs')
  , compression = require('compression')
  , debug = require('debug')('veesee')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , csrf = require('csurf')
  , bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  
  // custom modules
  , api = require('./routes/api')
  , home = require('./routes/home')
  , autho = require('./routes/auth')  
  // app
  , app = express();

// middlewares

app.use(cookieParser('123foracheaperprice', {}));
app.use(session({
    secret: 'buyingbetterproduce321',
    resave: false,
    saveUninitialized: true
}));
app.use(csrf());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(compression({
  threshold: 512
}));

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', home);
app.use('/api', api);
app.use('/auth', auth);

// port
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
// if(app.get('env') === 'production') {
//     /*TODO: fix this for launch */
    
//     try {
//         var pid = npid.create('/var/run/pmfat.pid');
//         pid.removeOnExit();
//     } catch (err) {
//         console.log('>> app.js - npmid error : ',err);
//         process.exit(1);
//     }
    
// }


// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

var server = app.listen(app.get('port'), function() {
  console.log('VeeSee server listening on port ' + server.address().port)
});

