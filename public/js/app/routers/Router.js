/**
    @module Router
*/

var $ = require('jquery')(window)
  , Backbone = require('backbone')
  , models = require('../models/models.js')
  , views = require('../views/views.js')
  , collections = require('../collections/collections.js')
  , Router;

Backbone.$ = window.$;

Router = Backbone.Router.extend({

    routes: {
        ''      : 'home',
        'login' : 'login',
        'app'   : 'app'
        
    },

    initialize: function initialize() {
        Backbone.history.start({ pushState: false });
    },
    
    home: function home() {
        new views.Home();       
    },

    login: function login() {
        new views.Login();
    },

    app : function app() {
        this.collection = new collections.Evaluators();
        this.collection.fetch({
            success : function(collection, response) {
                new views.Evaluators({ collection: collection });    
            },
            error : function() {
                console.error('Router >> error while fetching collection json data.');
            }
        });
    } 

});

module.exports = Router;