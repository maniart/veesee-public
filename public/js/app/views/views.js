/**
 * Describes the all view constructors
 * @module views
*/

define(["jquery", "backbone", "models/models", "text!templates/evaluator.html"], function($, Backbone, models, template){

        window.models = models;
        views = {


            Evaluator : Backbone.View.extend({

                el: '.evaluator',

                template : _.template(template),


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
                    this.$el.html(this.template({ model : new models.Evaluator() }))
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


            })



        }

        
        return views;

});

