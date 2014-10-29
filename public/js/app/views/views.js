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
                reveal : function(cb) {
                    this.$el.removeClass('hidden');
                    this.animate('in');
                    if(cb && typeof cb === 'function') {
                        cb.call();
                    }
                },
                conceal : function(cb) {
                    this.animate('out');
                    this.$el.addClass('hidden');
                    if(cb && typeof cb === 'function') {
                        cb.call();
                    }
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
                    var self = this;
                    console.warn('views : Evaluator.js >> Init Slider');
                    var $slider = this.$el.find('.slider');
                    var config = {
                        value : 50,
                        min : 0,
                        max : 100,
                        step : 1,
                        slide : function(event, ui) {
                            //console.warn('Slider changed : ', ui.value);
                            //console.log('******************** ', self);
                            //self.trigger('slider:value:change', { title: self.model.get('title'), sliderValue: ui.value });
                            self.model.set({'sliderValue' : ui.value});
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
                getCurrentChildView : function() {
                    return this.childViews[this.currentChildViewIndex];
                },
                next : function() {
                    var self = this;
                    this.getCurrentChildView().conceal(function() {
                        self.currentChildViewIndex ++;    
                    });
                    this.getCurrentChildView().reveal();
                },
                prev : function() {
                    var self = this;
                    this.getCurrentChildView().conceal(function() {
                        self.currentChildViewIndex --;
                    });
                    this.getCurrentChildView().reveal();
                },
                
                initialize : function() {
                    var self = this;
                    this.render();
                    this.populateChildViews(function() {
                        self.getCurrentChildView().reveal();    
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
                        this.prev();
                    }

                    
                }


            })



        };

        
        return views;

});

