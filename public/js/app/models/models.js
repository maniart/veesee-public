/**
 * Describes an object containing all Model constructors
 * @module Evaluator
 * @class Evaluator
 * @extends Backbone.View
*/

define(["jquery", "backbone"], function($, Backbone) {

    models = {

        Evaluator : Backbone.Model.extend({

            initialize : function() {

            },

            defaults :  {
                name : 'mani',
                last: 'nilchiani'
            },

            validate : function(attrs) {

            }

        })



    };

    return models;
    

});