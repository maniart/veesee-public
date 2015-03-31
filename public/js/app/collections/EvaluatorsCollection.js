/* @module EvaluatorsCollection */


/* imports */

var $ = require('jquery')(window)
  , Backbone = require('backbone')
  

/* modules */

  , BaseCollection = require('./BaseCollection'),
  , EvaluatorModel = require('../models/EvaluatorModel');

Backbone.$ = window.$;


/* exports */

module.exports = BaseCollection.extend({	

	model : EvaluatorModel,
	
	url : '/api',

	_save : function _save() {
		var self = this;
		Backbone.sync('create', this, {
			success : function success(response, status, jqXHR) {
				if(jqXHR.status === 200) {	 
					self.trigger('collection:save:success', { results: jqXHR.responseText });
				} else {
					console.error('something went wrong while saving collection');
				}	
			},
			error : function error(err) {
				console.error('collection failed to save: ', err);
			}
		});
		
	}

});