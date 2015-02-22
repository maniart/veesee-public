/**
 * Describes an object containing all Model constructors
 * @module Evaluator
 * @class Evaluator
 * @extends Backbone.View
*/
var $ = require('jquery')
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
        url: '/token'
    }),

    Login: Backbone.Model.extend({
        url: '/token'
    }),

    User: Backbone.Model.extend({
        defaults: {
            id: 0,
            name: '',
            organization: '',
            email: ''
        }
    }),

    Session: Backbone.Model.extend({
        url: '/auth',

        // Initialize with negative/empty defaults
        // These will be overriden after the initial checkAuth

        defaults: {
            logged_in: false,
            user_id: ''
        },

        initialize: function(){
            // Singleton user object
            // Access or listen on this throughout any module with app.session.user
            this.user = new models.User({});
        },

        // Fn to update user attributes after recieving API response
        updateSessionUser: function updateSessionUser(userData){
            this.user.set(_.pick(userData, _.keys(this.user.defaults)));
            return this;
        },

        /*
         * Check for session from API 
         * The API will parse client cookies using its secret token
         * and return a user object if authenticated
         */
        checkAuth: function checkAuth(callback, args) {
            var self = this;

            this.fetch({ 
                success: function(mod, res){
                    if(!res.error && res.user){
                        self
                            .updateSessionUser(res.user)
                            .set({ logged_in : true });
                        if('success' in callback) {
                            callback.success(mod, res);
                        }    
                    } else {
                        self.set({ logged_in : false });
                        if('error' in callback) {
                            callback.error(mod, res);
                        }    
                    }
                }, error:function(mod, res){
                    self.set({ logged_in : false });
                    if('error' in callback) {
                        callback.error(mod, res);
                    }    
                }
            }).complete( function(){
                if('complete' in callback) {
                    callback.complete();    
                } 
            });
        },

        /*
         * Abstracted fn to make a POST request to the auth endpoint
         * This takes care of the CSRF header for security, as well as
         * updating the user and session after receiving an API response
         */
        postAuth: function postAuth(opts, callback, args){
            var self = this
              , token;

            $.ajax({
                url: this.url + '/' + opts.method,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                beforeSend: function(xhr) {  
                    token = $('body').attr('data-token');
                    if (token) {
                        xhr.setRequestHeader('X-CSRF-Token', token);
                    }
                },
                data:  JSON.stringify(_.omit(opts, 'method')),
                success: function(res){
                    if( !res.error ){
                        if(_.indexOf(['login', 'signup'], opts.method) !== -1){
                            console.log('postAuth > success: ', res.user.email);
                            self
                                .updateSessionUser(res.user || {})
                                .set({
                                    user_id: res.user._id,
                                    logged_in: true
                                });
                        } else {
                            self.set({ logged_in: false });
                        }

                        if(callback && 'success' in callback) {
                            callback.success(res);
                        }
                    } else {
                        if(callback && 'error' in callback) {
                            callback.error(res);
                        }
                    }
                },
                error: function(mod, res){
                    if(callback && 'error' in callback) {
                        callback.error(res);
                    }
                }
            }).complete( function(){
                if(callback && 'complete' in callback) {
                    callback.complete(res);
                }
            });
        },


        login: function login(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'login' }), callback);
        },

        logout: function logout(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'logout' }), callback);
        },

        signup: function signup(opts, callback, args){
            this.postAuth(_.extend(opts, { method: 'signup' }), callback);
        },

        removeAccount: function removeAccount(opts, callback, args){
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