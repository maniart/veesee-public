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

// Check Auth route
router.get('/', function(req, res) {
    User.find({
            _id: req.signedCookies.veesee_user_id,
            auth_token: req.signedCookies.veesee_auth_token   
        }, 'email', function(err, user) {
            if(err) {
                res.json({
                    error: 'Client has no valid login cookies.'
                }); 
            } else {
                if(user.length) {
                    res.json({
                        user: user
                    });
                } else {
                    res.json({
                        message: 'User is not logged in.'
                    });
                }
            }
        });
});

// Login route
router.post('/login', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if(user) {
            // Compare the POSTed password with the encrypted db password
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.cookie('veesee_user_id', user._id, {
                    signed: true, 
                    maxAge: config.cookieMaxAge
                });
                res.cookie('veesee_auth_token', user.auth_token, {
                    signed: true, 
                    maxAge: config.cookieMaxAge
                });
                // correct credentials, return the user object
                res.json({
                    user: _.omit(user.toObject(), ['password', 'auth_token'])
                });
            } else {
                res.json({
                    error: 'Invalid email or password'
                });
            }
        } else {
            res.json({
                error: 'Email does not exist'
            });
        }
    });
});

// Signup route
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
            // Set the user cookies and return the cleansed user data
            res.cookie('veesee_user_id', user._id, {
                signed: true,
                maxAge: config.cookieMaxAge  
            });
            res.cookie('veesee_auth_token', user.auth_token, { 
                signed: true, 
                maxAge: config.cookieMaxAge  
            });
            res.json({
                user: _.omit(user.toObject(), ['password', 'auth_token']) 
            });    
        }
    });
});

// Logout route
router.post('/logout', function(req, res) {
    res.clearCookie('veesee_user_id');
    res.clearCookie('veesee_auth_token');
    res.json({ success: 'User successfully logged out.' });
});

// Remove account route
router.post('/remove_account', function(req, res) {
    User.remove({
        id: req.signedCookies.veesee_user_id,
        auth_token: req.signedCookies.veesee_auth_token
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