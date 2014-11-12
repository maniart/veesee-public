/**
 * Describing all collections
*/
define([
	
	"jquery",
	"backbone",
	"views/views",
	"models/models"
	], 
	
	function($, Backbone, views, models) {
		//debugger;
		var collections = {
		
			Evaluators : Backbone.Collection.extend({
				_this : this,
				model : models.Evaluator,
				url : '/api',
				save : function() {
					//debugger;
					var self = this;
					Backbone.sync('create', this, {
						success : function(response, status, jqXHR) {
							if(jqXHR.status === 200) {
								
								self.trigger('save', 
									{ resultsModel : new models.Results(JSON.parse(jqXHR.responseText)) }
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
    
    return collections;

});