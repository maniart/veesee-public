/* @module AboutView */


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
	
	template: _.template(fs.readFileSync(__dirname + '/../templates/about.html').toString()),

	$container : $('.app-container'),
        
	tagName : 'section',
        
  attributes : {
    'class' : 'about-view'
  },
	
	initialize: function initialize() {
		$(window).scrollTop(0,0);
		AuthView.prototype.initialize.apply(this, arguments);
	},

	_render: function _render() { 

		this.$el.html(this.template({model: this.model.toJSON()}));
    this.$container.html('').append(this.$el);
  },

  events: {
    'click .js-scroll-below-fold': function scrollBelowFold(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: this.$container.height()});
    }
  }  

});