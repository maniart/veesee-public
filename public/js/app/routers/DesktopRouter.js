// DesktopRouter.js
// ----------------
define([
    "jquery", 
    "backbone", 
    "models/models", 
    "views/views", 
    "collections/collections"],

    function($, Backbone, models, views, collections) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },
            
            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "" : "index",
                "app" : "app" 

            },

            home: function() {

                this.model = new models.Home();
                
                this.collection.fetch({
                    success : function(collection, response) {
                        new views.Evaluators({ collection : collection });    
                    },
                    error : function() {
                        console.error('DesktopRouter >> error while fetching for collection json data.');
                    }
                });

            },

            app : function() {
                this.collection = new collections.Evaluators();
                this.collection.fetch({
                    success : function(collection, response) {
                        new views.Evaluators({ collection : collection });    
                    },
                    error : function() {
                        console.error('DesktopRouter >> error while fetching for collection json data.');
                    }
                });

                
            }, 

            result : function(arg) {
                console.log('___---__-- ' ,arg);
            }

        });
        
        // Returns the DesktopRouter class
        return DesktopRouter;
                

    }

);