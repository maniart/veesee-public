/**
 * Describing all collections
*/
define(["jquery","backbone","models/models"], function($, Backbone, models) {

	var collections = {
		
		Evaluators : Backbone.Collection.extend({
		
			model : models.Evaluator,
			url : '/data'
			
		})
	
	};
    

    return collections;

});