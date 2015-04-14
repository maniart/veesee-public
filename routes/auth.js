/* @module auth */


/* imports */

var express = require('express')
  , _ = require('underscore')
  , mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')


/* modules */

  , db = require('../db')
  , config = require('../config')
  

/* vars */

  , User = mongoose.model('User')
  , router = express.Router();


/* helpers */

function login(response, user) {
  var options = {
    signed: true,
    maxAge: config.cookieMaxAge  
  }
  response.cookie(/*private*/, user._id, options);
  response.cookie(/*private*/, user.auth_token, options);
  response.json({
    user: _.omit(user.toObject(), ['password', 'auth_token']) 
  });   
}
function logout(response) {
  response.clearCookie(/*private*/);
  response.clearCookie(/*private*/);
  response.json({ success: 'User successfully logged out.' });
}


/* routes */

// - check auth
router.get('/', function(req, res) {
  User.find({
    _id: req.signedCookies./*private*/,
    auth_token: req.signedCookies./*private*/   
  }, 'email', function(err, user) {
    if(err) {
      res.json({
        error: 'Client has no valid login cookies.'
      });
    } 
    if(user.length) {
      res.json({
        user: user
      });
    } else {
      res.json({
        message: 'User is not logged in.'
      });
    }
  });
});
// - login
router.post('/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if(user) {
      // Compare the POSTed password with the encrypted db password
      if(bcrypt.compareSync(req.body.password, user.password)) {
        login(res, user);
      } else {
        res.json({
          error: 'Invalid email or password'
        });
      }
    } else {
      res.json({
        error: 'User does not exist'
      });
    }
  });
});
// - signup
router.post('/signup', function(req, res) {
  new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    auth_token: bcrypt.genSaltSync(8)
  }).save(function(err, user) {
    if(err) {
      res.json({
        error: 'There is already an account with this Email.', 
        field: 'email',
        err: err
      }); 
    } else {
      login(res, user);    
    }
  });
});
// - logout
router.post('/logout', function(req, res) {
  logout(res);  
});
// - remove_account
router.post('/remove_account', function(req, res) {
  User.remove({
    id: req.signedCookies./*private*/,
    auth_token: req.signedCookies./*private*/
  }, function(err){
    if(err) {
      res.json({ error: 'Error while trying to delete user.' }); 
    } else {
      logout(res);    
    }
  });
});


/* exports */

module.exports = router;
