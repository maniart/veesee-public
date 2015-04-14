/* @module app */


/* imports */

var express = require('express')
  , _ = require('underscore')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , fs = require('fs')
  , compression = require('compression')
  , debug = require('debug')('veesee')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , csrf = require('csurf')
  , bcrypt = require('bcrypt')
  , mongoose = require('mongoose')
  

/* modules */

  , api = require('./routes/api')
  , home = require('./routes/home')
  , auth = require('./routes/auth')
  , token = require('./routes/token')


/* vars */

  , server
  , _log = process.env.DEBUG ? debug : console.log


/* app */

  , app = express();


/* middlewares */

// - populates req.signedCookies
app.use(cookieParser(/* private */));
// - populates req.session, needed for CSRF
app.use(session({
  secret: /* private */,
  resave: false,
  saveUninitialized: false
}));
// - CSRF token
app.use(csrf());
// - logger
app.use(logger('dev'));
// - parse application/json
app.use(bodyParser.json());
// - bodyparser, accepts any Type in `req.body`
app.use(bodyParser.urlencoded({
  extended: true
}));
// - compression
app.use(compression({
  threshold: 512
}));
// - static
app.use(express.static(path.join(__dirname, 'public')));
// - handle 404
app.use(function(req, res) {
  res.status(400);
  res.redirect('/#404');
});
// - handle 500
app.use(function(error, req, res, next) {
  res.status(500);
  res.redirect('/#500');
});


/* routes */

_([home, api, auth, token]).each(function(controller) {
  var name = controller.name
    , route = name === 'home' ? '/' : '/' + name;
  
  app.use(route, controller);
});


/* settings */

app.set('port', process.env.PORT || 3030);


/* server  */

server = app.listen(app.get('port'), function() {
  _log('app on %d', server.address().port);
});
