/* @module SessionModel */


/* imports */

var $ = require('jquery')(window)
  , Backbone = require('backbone')


/* modules */

  , BaseModel = require('./BaseModel')
  , UserModel = require('./UserModel')

Backbone.$ = window.$;


/* exports */

module.exports = BaseModel.extend({
	
	url : '/auth',
	
	user: null,

	session: null,

	defaults: {
		logged_in: false,
		user_id: ''
	},

	initialize: function initialize(){
    this.user = UserModel.create();
    return BaseModel.prototype.initialize.apply(this, arguments);
	},

  // Fn to update user attributes after recieving API response
  updateUser: function updateUser(userData){
    return this
    	.user.set(_.pick(userData, _.keys(this.user.defaults)))
    	.trigger('user:update');
  },

  checkAuth: function checkAuth(callback, args) {
    var self = this;

    this.fetch({ 
      success: function success(model, response, options){
        if(!response.error && response.user){
          self
            .updateUser(response.user)
            .set({ logged_in : true });
          if('success' in callback) {
            callback.success(model, response);
          }    
        } else {
          self.set({ logged_in : false });
          if('error' in callback) {
            callback.error(model, response);
          }    
        }
      }, error: function error(mod, res){
        self.set({ logged_in : false });
        if('error' in callback) {
          callback.error(model, response);
        }    
      }
  	}).complete(function(){
      if('complete' in callback) {
        callback.complete();    
      } 
  	})

  },

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
            self
              .updateUser(res.user || {})
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
  
});