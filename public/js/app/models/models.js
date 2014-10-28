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
                
            },

            validate : function(attrs) {

            }

        })

    };

    return models;
    

});