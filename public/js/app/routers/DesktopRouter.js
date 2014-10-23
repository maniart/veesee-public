// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/models", "views/views", "collections/collections"],

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

            index: function() {

                // Instantiates a new view which will render the header text to the page
                //new View();

            },

            app : function() {
                
                var collection = new collections.Evaluators();
                collection.fetch({
                    success : function(collection, response) {
                        debugger;
                        console.log('>>>>> response is: ', response);
                        new views.Evaluators({ collection : collection });    
                    },
                    error : function() {
                        console.error('DesktopRouter >> error while fetching for collection json data.')
                    }
                });

                
            }

        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);