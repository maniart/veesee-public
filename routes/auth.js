/* 
    @module auth.js
    defines authentication endpoints
*/
var express = require('express')
  , router = express.Router()
  , db = require('../db')
  , mongoose = require('mongoose')
  , User = mongoose.model('User');

new User({
    id: 123,
    username: 'maniart', 
    name: 'Mani Nilchiani',
    auth_token: 'token',
    password: 'password'
}).save(function(record, one, two) {
    console.log(record,' >> ',one,' >> ',two);
});

router.get('/', function(req, res) {

});

router.post('/login', function(req, res) {

});

router.post('/signup', function(req, res) {

});

router.post('/logout', function(req, res) {

});

router.post('/remove_account', function(req, res) {

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