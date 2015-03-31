/* @module BaseCollection	*/


/* imports */

var $ = require('jquery')(window)
  , Backbone = require('backbone');

Backbone.$ = window.$;


/* exports */

module.exports = Backbone.Collection.extend({	

	initialize: function initialize() {
		return this.trigger('collection:initialize');
	},

	beforeSave: function beforeSave() {
		return this.trigger('collection:save:before');
	},

	save: function save() {
		this
			.beforeSave()
			._save();
		return this
			.trigger('collection:save')
			.afterSave();
	},

	afterSave: function afterSave() {
		return this.trigger('collection:save:after');
	},

	_save: function _save() { /* noop */}

}, {

	create: function create(options) {
		return new this(options);
	}

});