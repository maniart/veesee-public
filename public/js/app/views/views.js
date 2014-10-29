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
                    'class' : 'evaluator hidden' 
                },
                template : _.template(singleTpl),
                reveal : function() {
                    this.$el.removeClass('hidden');
                    this.animate();
                },
                conceal : function() {
                    this.animate('out');
                    this.$el.addClass('hidden');
                },
                animate : function(type) {
                    switch(type) {
                        case 'in':
                            this.$el.addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                $(this).removeClass('fadeInDown animated');
                            }); 
                        break;
                        case 'out':
                            this.$el.addClass('fadeOutDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                $(this).removeClass('fadeOutDown animatepd');
                            }); 
                        break;
                        default:
                            this.$el.addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                $(this).removeClass('fadeInDown animated');
                            }); 
                        break;
                    }
                        
                },
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

                },
                render : function() {
                    this.$el.html(this.template({ model : this.model.toJSON() }));
                    console.warn('views : Evaluator.js >> render');
                    return this;
                }

            }),


            Evaluators : Backbone.View.extend({

                $container : $('.app-container'),
                template : _.template(groupTpl),
                tagName : 'section', 
                attributes : {
                    'class' : 'evaluators-container'
                },
                childViews : [],
                currentChildViewIndex : 0,
                next : function() {
                    var currentChildView,
                        nextChildView;
                    //debugger;
                    currentChildView = this.childViews[this.currentChildViewIndex];
                    currentChildView.conceal();
                    this.currentChildViewIndex ++;
                    nextChildView = this.childViews[this.currentChildViewIndex];
                    nextChildView.reveal();
                },
                prev : function() {

                },
                
                initialize : function() {
                    var self = this;
                    this.render();
                    this.populateChildViews(function() {
                        self.childViews[0].reveal();    
                    });
                    
                },
                populateChildViews : function(cb) {
                    var self = this,
                        evaluatorView;
                    this.collection.each(function(evaluatorModel) {
                    
                        evaluatorView = new views.Evaluator({ model : evaluatorModel });
                        self.childViews.push(evaluatorView);
                        console.warn('___________________________ ', self.childViews);
                        self.$el.append(evaluatorView.el);                       
                        
                    });
                    // callback
                    if(cb && typeof cb === 'function') {
                        cb.call();  
                    }    
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

                       
                },

                events : {
                    
                    'click .next' : function(event) {
                        event.preventDefault();
                        this.next();
                        
                    },
                    'click .prev' : function(event) {
                        event.preventDefault();
                        console.warn('**** views : Evaluator.js >> click prev');
                    }
                    
                }


            })



        };

        
        return views;

});

