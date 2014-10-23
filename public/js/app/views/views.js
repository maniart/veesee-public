/**
 * Describes the all view constructors
 * @module views
*/

define([
    "jquery", 
    "backbone", 
    "models/models", 
    "collections/collections",
    "text!templates/evaluator.html",
    "text!templates/evaluators.html"], 
    function($, Backbone, models, collections, singleTpl, groupTpl){

        views = {


            Evaluator : Backbone.View.extend({

                el: '.evaluator',

                template : _.template(singleTpl),


                initSlider : function(el) {

                    console.warn('views : Evaluator.js >> Init Slider');
                },
                
                setSliderValue : function(data) {
                    
                    console.warn('views : Evaluator.js >> setSliderValue'); 
                
                },
                
                initialize : function() {
                    console.warn('views : Evaluator.js >> initialize');
                    this.render();
                    //this.attachListeners();
                    //this.initSlider('.slider');
                },
                render : function() {
                    this.$el.html(this.template({ model : new models.Evaluator() }));
                    /*
                    this.$container.html('');
                    this.$el.html(this.compiledTemplate({ 
                        attributes : _.clone(this.model.attributes),
                        steps : ['team', 'market', 'development stage', 'competetive advantage', 'traction', 'distribution channel']
                    }));
                    this.$container.append(this.$el);
                    this.animate();
                    */
                    console.warn('views : Evaluator.js >> render');
                    return this;
                },

                events : {
                    
                    'click .next' : function(event) {
                        event.preventDefault();
                        console.warn('views : Evaluator.js >> click next');
                        
                    },
                    'click .prev' : function(event) {
                        event.preventDefault();
                        console.warn('views : Evaluator.js >> click prev');
                    },
                    'click .calculate' : function(event) {
                        event.preventDefault();
                        console.warn('views : Evaluator.js >> click calculate');
                    }
                }


            }),


            Evaluators : Backbone.Model.extend({

                el : '.evaluators',
                tagName : 'section', 

                initialize : function() {
                    console.log('views.js >> rendering Evaluators view');
                    this.render();
                },
                render : function() {
                    debugger;
                    this.collection['categories'].each(function(category) {
                        category['steps'].each(function(step) {
                            var evaluator = new views.Evaluators({ model : step });    
                        })
                        //var evaluator = new views.Evaluator({ model : model })    
                    });     
                }

            })



        };

        
        return views;

});

