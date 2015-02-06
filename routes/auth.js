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
authpp.use(cookieParser('123foracheaperprice', {}));
app.use(session({
    secret: 'buyingbetterproduce321',
    resave: false,
    saveUninitialized: true
}));
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
            console.log(user);
            console.log('success - config: ', config);
            res.cookie('userId', user.id, { signed: true, maxAge: config.cookieMaxAge  });
            res.cookie('authToken', user.authToken, { signed: true, maxAge: config.cookieMaxAge  });
            res.json({ user: _.omit(user, ['password', 'authToken']) });    
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

/*
app.get("/api/auth", function(req, res){
    db.get("SELECT * FROM users WHERE id = ? AND auth_token = ?", [ req.signedCookies.user_id, req.signedCookies.auth_token ], function(err, user){
        if(user){
            res.json({ user: _.omit(user, ['password', 'auth_token']) });   
        } else {  
            res.json({ error: "Client has no valid login cookies."  });   
        }
    });
});
*/

// POST /api/auth/login
// @desc: logs in a user
/*
app.post("/api/auth/login", function(req, res){
    db.get("SELECT * FROM users WHERE username = ?", [ req.body.username ], function(err, user){
        if(user){

            // Compare the POSTed password with the encrypted db password
            if( bcrypt.compareSync( req.body.password, user.password)){
                res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
                res.cookie('auth_token', user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });

                // Correct credentials, return the user object
                res.json({ user: _.omit(user, ['password', 'auth_token']) });   

            } else {
                // Username did not match password given
                res.json({ error: "Invalid username or password."  });   
            }
        } else {
            // Could not find the username
            res.json({ error: "Username does not exist."  });   
        }
    });
});
*/
// POST /api/auth/signup
// @desc: creates a user
/*
app.post("/api/auth/signup", function(req, res){
    db.serialize(function(){
        db.run("INSERT INTO users(username, name, password, auth_token) VALUES (?, ?, ?, ?)", 
                [ req.body.username, req.body.name, bcrypt.hashSync(req.body.password, 8), bcrypt.genSaltSync(8) ], function(err, rows){
            if(err){
                res.json({ error: "Username has been taken.", field: "username" }); 
            } else {

                // Retrieve the inserted user data
                db.get("SELECT * FROM users WHERE username = ?", [ req.body.username ], function(err, user){
                    if(!user) {
                        console.log(err, rows);
                        res.json({ error: "Error while trying to register user." }); 
                    } else {

                        // Set the user cookies and return the cleansed user data
                        res.cookie('user_id', user.id, { signed: true, maxAge: config.cookieMaxAge  });
                        res.cookie('auth_token', user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });
                        res.json({ user: _.omit(user, ['password', 'auth_token']) });   
                    }
                });
            }
        });
    });
});
*/

// POST /api/auth/logout
// @desc: logs out a user, clearing the signed cookies
/*
app.post("/api/auth/logout", function(req, res){
    res.clearCookie('user_id');
    res.clearCookie('auth_token');
    res.json({ success: "User successfully logged out." });
});
*/

// POST /api/auth/remove_account
// @desc: deletes a user
/*
app.post("/api/auth/remove_account", function(req, res){
    db.run("DELETE FROM users WHERE id = ? AND auth_token = ?", [ req.signedCookies.user_id, req.signedCookies.auth_token ], function(err, rows){
        if(err){ 
            res.json({ error: "Error while trying to delete user." }); 
        } else {
            res.clearCookie('user_id');
            res.clearCookie('auth_token');
            res.json({ success: "User successfully deleted." });
        }
    });
});
*/
module.exports = router;