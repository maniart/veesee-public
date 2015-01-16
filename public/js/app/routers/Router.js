// DesktopRouter.js
// ----------------
var $ = require('jquery');
var Backbone = require('Backbone');
var models = require('../models/models.js');
var views = require('../views/views.js');
var collections = require('../collections/collections.js');

var Router = Backbone.Router.extend({

    initialize: function() {
        Backbone.history.start();
    },
    
    routes: {
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
        console.log('- result' ,arg);
    }

});

module.exports = Router;