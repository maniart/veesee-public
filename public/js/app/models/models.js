/**
 * Describes an object containing all Model constructors
 * @module Evaluator
 * @class Evaluator
 * @extends Backbone.View
*/

define([
    
    "jquery", 
    "backbone"], 

    function($, Backbone) {

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

        Home : Backbone.Model.extend({

            initialize : function() {

            },

            defaults : {
                'message' : 'Welcome to VeeSee'
            }

        }),

        Results : Backbone.Model.extend({

            initialize : function() {
                console.warn('Results page model');
            }
            

        })

    };

    return models;
    

});