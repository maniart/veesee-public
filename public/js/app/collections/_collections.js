/**
 * Describing all collections
*/
var $ = require('jquery')(window);
var Backbone = require('backbone');
var views = require('../views/views.js');
var models = require('../models/models.js');
Backbone.$ = window.$;

var collections = {
		
	Evaluators : Backbone.Collection.extend({
		initialize : function() {
		},
		model : models.Evaluator,
		url : '/api',
		save : function() {
			var self = this;
			Backbone.sync('create', this, {
				success : function(response, status, jqXHR) {
					var resultsModel;
					if(jqXHR.status === 200) {
						resultsModel  =  new models.Results(JSON.parse(jqXHR.responseText)); 
						self.trigger('save', 
							{ resultsModel : resultsModel }
						);

					} else {
						console.error('something went wrong?');
					}
					
				},
				error : function(err) {
					console.warn('****** collection failed to save.');
				}
			});
			
		}
	
	})

};

module.exports = collections;