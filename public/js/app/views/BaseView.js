/* @module BaseView */


/* imports */


var $ = require('jquery')
  , Backbone = require('backbone')


/* vars */
  , $window = $(window);

Backbone.$ = window.$;


/* exports */

module.exports = Backbone.View.extend({
	
	template: null,

	tagName: '',

	initialize: function initialize() {
		this.beforeRender();
		this.render()
			.afterRender();
		return this.trigger('view:initialized');
	},

	beforeRender: function beforeRender() {
		this.trigger('view:render:before');
		return this;
	},

	render: function render() {
		this._render();
		this.trigger('view:render');
		return this;
	},

	afterRender: function afterRender() {
		this.trigger('view:render:after');
		this._underConstruction();
		return this;
	},

	_render: function _render() { /* noop */ },

	_underConstruction: function _underConstruction() {
		var location = window.location;
		function checkHash() {
			
			if(location.search === '?sauce=hot' || location.hash.indexOf('?sauce=hot') !== -1) {
				$('.under-construction').fadeOut(100);
			}	
		}
		checkHash();
		$window.on('hashchange', function(ev) {
			checkHash()
		});
	}



}, {
	create: function create(options) {
		return new this(options);
	}
});