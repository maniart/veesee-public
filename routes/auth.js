/* 
    @module auth.js
    defines authentication endpoints
*/

var express = require('express')
  , router = express.Router()
  , _ = require('underscore')
  , db = require('../db')
  , config = require('../config.js')
  , mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , User = mongoose.model('User');

router.get('/', function(req, res) {
    User.find({
        id: req.signedCookies.user_id,
        auth_token: req.signedCookies.auth_token
    }, function(err, user) {
        if(err) {
            res.json({ error: 'Error retrieving user.'});
        } else {
            if(user){
                res.json({ user: _.omit(user, ['password', 'auth_token']) });   
            } else {  
                res.json({ error: "Client has no valid login cookies."  });   
            }    
        }
        
    });
});

router.post('/login', function(req, res) {
    console.log('>>>  post /auth/login');
    User.find({
        username: req.body.username
    }, function(err, user) {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.cookie('user_id', user.id, {signed: true, maxAge: config.cookieMaxAge});
                res.cookie('auth_token', user.auth_token, {signed: true, maxAge: config.cookieMaxAge});
                // correct credentials, return the user object
                res.json({user: _.omit(user, ['password', 'auth_token'])});
            } else {
                res.json({error: 'Invalid username or password'});
            }
        } else {
            res.json({error: 'Username does not exist'});
        }
    });
});

router.post('/signup', function(req, res) {
    console.log('>>>  post /auth/signup');
    new User({
        username: req.body.username,
        //name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8),
        auth_token: bcrypt.genSaltSync(8)
    }).save(function(err, user) {
        if(err) {
           console.log('err - config: ', config);

            res.json({ error: 'Username has been taken.', field: 'username' }); 
        
        } else {
            // Set the user cookies and return the cleansed user data
            console.log('user: ', _.omit(user.toObject(), ['password', 'auth_token']) ); 
            res.cookie('user_id', user._id, {
                signed: true,
                maxAge: config.cookieMaxAge  
            });
            res.cookie('auth_token', user.auth_token, { 
                signed: true, 
                maxAge: config.cookieMaxAge  
            });
            res.json({ user: _.omit(user.toObject(), ['password', 'auth_token']) });    
        }
    });
});

router.post('/logout', function(req, res) {
    console.log('>>>  route /auth/logout');
    res.clearCookie('user_id');
    res.clearCookie('auth_token');
    res.json({ success: "User successfully logged out." });
});

router.post('/remove_account', function(req, res) {
    console.log('>>>  route /auth/remove_account');
    User.remove({
        id: require.signedCookies.user_id,
        auth_token: req.signedCookies.auth_token
    }, function(err){
        if(err) {
            res.json({ error: 'Error while trying to delete user.' }); 
        } else {
            res.clearCookie('user_id');
            res.clearCookie('auth_token');
            res.json({ success: 'User successfully deleted.' });    
        }
    });
});

module.exports = router;