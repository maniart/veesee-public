/**
 * Describing all collections
*/
define(["jquery","backbone","models/models"], function($, Backbone, models) {

	var collections = {
		
		Evaluator : Backbone.Collection.extend({
		
			model : models.Evaluator
		
		})
	
	};
    

    return collections;

});