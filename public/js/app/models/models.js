/**
 * Describes an object containing all Model constructors
 * @module Evaluator
 * @class Evaluator
 * @extends Backbone.View
*/
var $ = require('jquery')(window)
  , Backbone = require('backbone')
  , _ = require('underscore');

Backbone.$ = window.$;

var models = {

    Evaluator: Backbone.Model.extend({
        defaults: {
            'sliderValue' : 50
        }
    }),

    Evaluators: Backbone.Model.extend({}),

    Home: Backbone.Model.extend({
        url: '/token',
        initialize: function initialize() {
            this.fetch();
        }
    }),

    Login: Backbone.Model.extend({}),

    User: Backbone.Model.extend({

        initialize: function initialize(){
            console.warn('new User model');
        },

        defaults: {
            id: 0,
            username: '',
            name: '',
            email: ''
        },

        url: '/user'

    }),

    Session: Backbone.Model.extend({

        // Initialize with negative/empty defaults
        // These will be overriden after the initial checkAuth
        defaults: {
            logged_in: false,
            user_id: ''
        },

        initialize: function(){
            console.warn('new Session model');

            // Singleton user object
            // Access or listen on this throughout any module with app.session.user
            this.user = new models.User({});
        },


        url: '/auth',

        // Fxn to update user attributes after recieving API response
        updateSessionUser: function( userData ){
            this.user.set(_.pick(userData, _.keys(this.user.defaults)));
        },



        /*
         * Check for session from API 
         * The API will parse client cookies using its secret token
         * and return a user object if authenticated
         */
        checkAuth: function(callback, args) {

                
            var self = this;
            this.fetch({ 
                success: function(mod, res){
                    if(!res.error && res.user){
                        debugger;
                        self.updateSessionUser(res.user);
                        self.set({ logged_in : true });
                        if('success' in callback) callback.success(mod, res);    
                    } else {
                        self.set({ logged_in : false });
                        if('error' in callback) callback.error(mod, res);    
                    }
                }, error:function(mod, res){
                    debugger;
                    self.set({ logged_in : false });
                    if('error' in callback) callback.error(mod, res);    
                }
            }).complete( function(){
                if('complete' in callback) callback.complete();
            });
        },


        /*
         * Abstracted fxn to make a POST request to the auth endpoint
         * This takes care of the CSRF header for security, as well as
         * updating the user and session after receiving an API response
         */
        postAuth: function(opts, callback, args){
            var self = this;
            var postData = _.omit(opts, 'method');
            console.log(postData);
            $.ajax({
                url: this.url() + '/' + opts.method,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                beforeSend: function(xhr) {
                    // Set the CSRF Token in the header for security
                    var token = $('input[name="csrf-token"]').attr('value');
                    if (token) xhr.setRequestHeader('X-CSRF-Token', token);
                },
                data:  JSON.stringify( _.omit(opts, 'method') ),
                success: function(res){

                    if( !res.error ){
                        if(_.indexOf(['login', 'signup'], opts.method) !== -1){

                            self.updateSessionUser( res.user || {} );
                            self.set({ user_id: res.user.id, logged_in: true });
                        } else {
                            self.set({ logged_in: false });
                        }

                        if(callback && 'success' in callback) callback.success(res);
                    } else {
                        if(callback && 'error' in callback) callback.error(res);
                    }
                },
                error: function(mod, res){
                    if(callback && 'error' in callback) callback.error(res);
                }
            }).complete( function(){
                if(callback && 'complete' in callback) callback.complete(res);
            });
        },


        login: function(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'login' }), callback);
        },

        logout: function(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'logout' }), callback);
        },

        signup: function(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'signup' }), callback);
        },

        removeAccount: function(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'remove_account' }), callback);
        }

    }),

    Results: Backbone.Model.extend({
        initialize : function() {
            console.warn('Results page model');
        }
    })

};

module.exports = models;