/* @module AuthView */


/* imports */

// keeping the `var`: https://gist.github.com/maniart/4e7d3395ce0e55f2e67d
var fs = require('fs');
var $ = require('jquery')(window)
  , Backbone = require('backbone')
  , _ = require('underscore')


/* modules */

  , BaseView = require('./BaseView');

Backbone.$ = window.$;


/* exports */

module.exports = BaseView.extend({
	
	beforeRender: function beforeRender() { 
		console.log(this.model);
		BaseView.prototype.beforeRender.apply(this, arguments);
	}

});