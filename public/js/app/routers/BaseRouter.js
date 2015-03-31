/* @module BaseRouter */


/* imports */
var $ = require('jquery')(window)
  , Backbone = require('backbone');

Backbone.$ = window.$;

module.exports = Backbone.Router.extend({

  initialize: function initialize() {    
    Backbone.history.start({ pushState: false });                        
    console.log('Router: init');
  }   

}, {
  create: function create(options) {
    return new this(options);
  }
});

