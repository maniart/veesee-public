/* @module LoginView */


/* imports */

// keeping the `var`: https://gist.github.com/maniart/4e7d3395ce0e55f2e67d
var fs = require('fs');
var $ = require('jquery')
  , Backbone = require('backbone')
  , _ = require('underscore')


/* modules */

  , AuthView = require('./AuthView');

Backbone.$ = window.$;


/* exports */

module.exports = AuthView.extend({
	
	template: _.template(fs.readFileSync(__dirname + '/../templates/login.html').toString()),

	$container : $('.app-container'),
        
	tagName : 'section',
        
  attributes : {
      'class' : 'login-view'
  },
        
  _render : function _render(data) {
      this.$el.html(this.template({}));
      this.$container.html('').append(this.$el);
  },

  beforeRender: function beforeRender() {
  	AuthView.prototype.beforeRender.apply(this, arguments);
  	var setToken = _.bind(function(token) {
        this.$('body').attr('data-token', token);
    }, this)
      , render = _.bind(this.render, this)
      , self = this;
    
    this.model.on('change', function() {
        this._render();
        console.log('Session changed', this.changedAttributes());

    });
    
    if(!$('body').attr('data-token')) {
      this.model.constructor.session.fetch({
        success: function success(model, response, options) {
            setToken(response.csrfToken);
        }
      });
    }
    
  },

  events : {
    'click .logout-account'                 : 'onLogout',
    'click .delete-account'                 : 'onDeleteAccount',
    'click .js-show-signup'                 : 'toggleForms',
    'click .js-show-login'                  : 'toggleForms',
    'click #login-btn'                      : 'onLoginAttempt',
    'click #signup-btn'                     : 'onSignupAttempt',
    'keyup #login-password-input'           : 'onPasswordKeyup',
    'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup'
  },

  toggleForms : function(event) {  
    event.preventDefault();
    this.$('.login, .signup').toggle();
  },
        
  onLoginStatusChange: function onLoginStatusChange() {
    if(session.get('logged_in')) {
      console.log('You are logged in now.');
    } else {
      console.log('Bye!');
    }
  },

  onLogout: function onLogout(evt) {
    evt.preventDefault();
    this.model.constructor.session.logout({});
  },

  onDeleteAccount: function onDeleteAccount(evt) {
      evt.preventDefault();
      this.model.constructor.session.removeAccount({});
  },

  // Allow enter press to trigger login
  onPasswordKeyup: function onPasswordKeyup(evt){
    var k = evt.keyCode || evt.which;

    if (k == 13 && $('#login-password-input').val() === ''){
      evt.preventDefault();    // prevent enter-press submit when input is empty
    } else if(k == 13){
      evt.preventDefault();
      this.onLoginAttempt();
      return false;
    }
  },

  // Allow enter press to trigger signup
  onConfirmPasswordKeyup: function onConfirmPasswordKeyup(evt){
    var k = evt.keyCode || evt.which;
    if (k == 13 && $('#confirm-password-input').val() === ''){
        evt.preventDefault();   // prevent enter-press submit when input is empty
    } else if(k == 13){
      evt.preventDefault();
      this.onSignupAttempt();
      return false;
    }
  },

  onLoginAttempt: function onLoginAttempt(evt){
    if(evt) evt.preventDefault();

    if(this.$("#login-form").parsley('validate')){
      this.model.constructor.session.login({
        email: this.$("#login-email-input").val(),
        password: this.$("#login-password-input").val()
      }, {
        success: function(mod, res){
          console.log("SUCCESS", mod, res);
        },
        error: function(err){
            console.log('Bummer dude!', err.error, 'alert-danger'); 
        }
    });
    } else {
      // Invalid clientside validations thru parsley
      console.log("Did not pass clientside validation");
    }
  },
        
  onSignupAttempt: function onSignupAttempt(evt){
    if(evt) evt.preventDefault();
    if(this.$("#signup-form").parsley('validate')){
      this.model.constructor.session.signup({
          email: this.$("#signup-email-input").val(),
          password: this.$("#signup-password-input").val(),
      }, {
      success: function(mod, res){
        console.log("SUCCESS", mod, res);

      },
      error: function(err){
        console.log("ERROR", err);
        console.log('Uh oh!', err.error, 'alert-danger'); 
      }
      });
      } else {
        // Invalid clientside validations thru parsley
        console.log("Did not pass clientside validation");
      }
  }

});