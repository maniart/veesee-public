/**
 * Describing all collections
*/
define([
	
	"jquery",
	"backbone",
	"models/models"], 
	
	function($, Backbone, models) {

	var collections = {
		
		Evaluators : Backbone.Collection.extend({
		
			model : models.Evaluator,
			url : '/data',
			save : function() {
				console.warn('****** collection is saving...');
				Backbone.sync('create', this, {
					success : function(jqXHR) {
						console.warn('****** collection is saved successfully.');
					},
					error : function(err) {
						console.warn('****** collection failed to save.');
					}
				})
				
			}
			
		})
	
	};
    
    return collections;

});