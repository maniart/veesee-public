/* @module db */


/* imports */

var mongoose = require('mongoose')
  , config = require('./config')
  , debug = require('debug')('veesee')
  

/* vars */

  , User = new mongoose.Schema({
      id: Number,
      email: String,
      organization: String, 
      name: String,
      auth_token: String,
      password: String
    })
  , options = {
      server: {
        socketOptions: { 
          keepAlive: 1 
        } 
      }
    }
  , _log = process.env.DEBUG ? debug : console.log;


/* settings */

// - create model
mongoose.model('User', User);
// - debug
mongoose.set('debug', true);
// - connect
mongoose.connect(config.MONGODB_URL, options);
// - error handling
mongoose.connection.on('error', _log);
// - retry
mongoose.connection.on('disconnected', function() {
  mongoose.connect(config.MONGODB_URL, options);
});
// - connected
mongoose.connection.on('connected', function() {
    _log('db:conected');
});