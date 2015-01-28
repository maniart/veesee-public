/**
 * Describes an object containing all Model constructors
 * @module Evaluator
 * @class Evaluator
 * @extends Backbone.View
*/
var $ = require('jquery')(window);
var Backbone = require('backbone');
Backbone.$ = window.$;

var models = {

    Evaluator : Backbone.Model.extend({
        initialize : function() {
            /*
            this.on('change', function(model) {
                console.warn(model.get('sliderValue'));
            });   
            */   
        },

        defaults : {
            'sliderValue' : 50
        },

        validate : function(attrs) {

        }
    }),

    Evaluators : Backbone.Model.extend({
        initialize : function() {
            console.log('Evaluators Model init');
        }
    }),

    Home : Backbone.Model.extend({}),

    Login : Backbone.Model.extend({
        urlRoot: '/login',
        initialize: function initialize() {
            console.warn('Login model');
        }
    }),

    Results : Backbone.Model.extend({
        initialize : function() {
            console.warn('Results page model');
        }
    })

};

module.exports = models;