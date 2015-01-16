// DesktopRouter.js
// ----------------
var $ = require('jquery');
var Backbone = require('Backbone');
var models = require('../models/models');
var views = require('../views/views');
var collections = require('../collections/collections');

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
                "" : "home",
                "app" : "app" 

            },

            home: function() {

                new views.Home();

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