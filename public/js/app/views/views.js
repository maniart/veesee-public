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

        var views = {


            Evaluator : Backbone.View.extend({

                
                tagName : 'article',

                attributes : {
                    'class' : 'evaluator' 
                },

                template : _.template(singleTpl),


                initSlider : function() {

                    console.warn('views : Evaluator.js >> Init Slider');
                    var $slider = this.$el.find('.slider');
                    var config = {
                        value : 50,
                        min : 0,
                        max : 100,
                        step : 1,
                        slide : function(event, ui) {
                            console.warn('Slider changed : ', event);

                        }
                    
                    };
                    $slider.slider(config);
                },
                
                setSliderValue : function(data) {
                    
                    console.warn('views : Evaluator.js >> setSliderValue'); 
                
                },
                
                initialize : function() {

                    console.warn('views : Evaluator.js >> initialize' , this.model.toJSON());
                    this.render();
                    this.initSlider();
                    //this.attachListeners();
                    //this.initSlider('.slider');
                },
                render : function() {
                    this.$el.html(this.template({ model : this.model.toJSON() }));
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


            Evaluators : Backbone.View.extend({

                $container : $('.app-container'),
                template : _.template(groupTpl),
                tagName : 'section', 
                attributes : {
                    'class' : 'evaluators-container'
                },
                initialize : function() {
                    this.render();
                },
                render : function() {
                    this.$el.html(this.template({}));
                    console.log('views.js - this.collection: ', this);
                    var self = this;
                    this.collection.each(function(evaluatorModel) {
                        var evaluatorView = new views.Evaluator({ model : evaluatorModel });
                        self.$el.append(evaluatorView.el);                       
                        
                    });
                    this.$container.append(self.$el);

                       
                }

            })



        };

        
        return views;

});

