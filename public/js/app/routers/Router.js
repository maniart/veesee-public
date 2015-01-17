// DesktopRouter.js
// ----------------
var $ = require('jquery')(window);
var Backbone = require('backbone');
var models = require('../models/models.js');
var views = require('../views/views.js');
var collections = require('../collections/collections.js');
Backbone.$ = window.$;

var Router = Backbone.Router.extend({

    initialize: function() {
        Backbone.history.start({
            pushState: false
        });
    },
    
    routes: {
        "" : "static",
        "app" : "app" 
    },

    static: function() {
        // only render home if path does not include `/login`
        var pathname = window.location.pathname;
        if(pathname.match(/login/g)) {
            new views.Login();
        } else {
            new views.Home();
        }       
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