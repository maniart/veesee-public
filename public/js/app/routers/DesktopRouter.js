// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/models", "views/views", "collections/Collection"],

    function($, Backbone, models, views, Collection) {

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
                new views.Evaluator();

            }

        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);