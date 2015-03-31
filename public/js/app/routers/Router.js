/* @module BaseRouter */


/* imports */
var $ = require('jquery')(window)
  , Backbone = require('backbone')


/* modules */

  , BaseRouter = require('./BaseRouter')
  , home = require('../controllers/homeController')
  , about = require('../controllers/aboutController')
  , login = require('../controllers/loginController')
  , dashboard = require('../controllers/dashboardController');


Backbone.$ = window.$;


/* exports */

module.exports = BaseRouter.extend({

  routes: {
    ''          : home,
    'about'     : about,
    'login'     : login,
    'dashboard' : dashboard
  }
    


  /*
  dashboard: dashboard

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

    */

});