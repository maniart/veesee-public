/**
    @module Router
*/

var $ = require('jquery')(window)
  , Backbone = require('backbone')
  , models = require('../models/models.js')
  , session = require('../models/session.js')
  , views = require('../views/views.js')
  , collections = require('../collections/collections.js')
  , session = require('../models/session.js')
  , Router;

Backbone.$ = window.$;

Router = Backbone.Router.extend({

    routes: {
        ''      : 'home',
        'login' : 'login',
        'app'   : 'app'
        
    },

    initialize: function initialize() {
        
        session.checkAuth({
          // Start the backbone routing once we have captured a user's auth status
          complete: function(mode, res){
            console.log('complete', arguments);
          },
          error: function error() {
            console.log('error', arguments);
          }, 
          success: function success() {
            console.log('success', arguments);
          }
        });
        Backbone.history.start({pushState: false});                        
        console.log('session: ', session);
    },
    
    home: function home() {
        console.log('home route');
        var homeModel = new models.Home({})
          , homeView = new views.Home({model: homeModel});
    },

    login: function login() {
        console.log('login route');
        var loginModel = new models.Login({})
          , loginView = new views.Login({model: loginModel});
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