/**
 * Describing all collections
*/
define([
	
	"jquery",
	"backbone",
	"models/models", 
	"init/DesktopInit"], 
	
	function($, Backbone, models, DesktopInit) {

	var collections = {
		
		Evaluators : Backbone.Collection.extend({
		
			model : models.Evaluator,
			url : '/api',
			save : function() {
				Backbone.sync('create', this, {
					success : function(response, status, jqXHR) {
						if(jqXHR.status === 200) {
							console.log('Response success: ', jqXHR);
							alert(jqXHR.responseText);

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