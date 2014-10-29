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
                this.on('change', function(model) {
                    console.warn(model.get('sliderValue'));
                })        
            },
            defaults : {
                'sliderValue' : 0
            },

            validate : function(attrs) {

            },


        }),

        Values : Backbone.Model.extend({
            initialize : function() {
                this.on('slider:value:change',function(data) {
                    console.warn('title: ', data.title, ' sliderValue: ', data.sliderValue);
                });
            }
        })

    };

    return models;
    

});