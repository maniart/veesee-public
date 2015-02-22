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
    User
        .find({
            _id: req.signedCookies.user_id,
            auth_token: req.signedCookies.auth_token   
        }, 'email', function(err, user) {
            if(err) {
                res.json({
                    error: 'Client has no valid login cookies.'
                }); 
            } else {
                console.log('>> auth.js >> / >> user:', user);
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

router.post('/login', function(req, res) {
    function onErr(err, callback) {
        mongoose.connection.close();
        callback(err);
    }
    
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
                console.log('logged in. sending this', _.omit(user.toObject(), ['password', 'auth_token']));
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

router.post('/signup', function(req, res) {
    console.log('>>>  post /auth/signup', req.body);
    new User({
        email: req.body.email,
        //name: req.body.name,
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
            console.log('user: ', _.omit(user.toObject(), ['password', 'auth_token']) ); 
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