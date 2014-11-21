/**
 * Describing all collections
*/
define([
	
	"jquery",
	"backbone",
	"localStorage",
	"views/views",
	"models/models"
	], 
	
	function($, Backbone, localStorage, views, models) {
		var collections = {
		
			Evaluators : Backbone.Collection.extend({
				initialize : function() {
					console.log('this.localstorage: ', this.localstorage);
				},
				model : models.Evaluator,
				savedResults : JSON.parse(window.localStorage.getItem('results')) || {}, 
				localstorage : new Backbone.LocalStorage('results'),
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
								// temp
								window.localStorage.setItem('results', JSON.stringify(resultsModel));



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
    
    return collections;

});