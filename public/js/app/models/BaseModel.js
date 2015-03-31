/* @module BaseModel */


/* imports */

var $ = require('jquery')(window)
  , Backbone = require('backbone');

Backbone.$ = window.$;


/* exports */

module.exports = Backbone.Model.extend({
	
	initialize: function initialize() {
		return this.trigger('model:initialized');
	}

}, {
	create: function create(options) {
		return new this(options);
	}
});