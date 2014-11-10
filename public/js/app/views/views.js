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
                    //console.warn('views : Evaluator.js >> Init Slider');
                    var $slider = this.$el.find('.slider');
                    var config = {
                        value : self.model.get('sliderValue'),
                        min : 0,
                        max : 100,
                        step : (function() {
                            //debugger;
                            return self.model.get('sliderType') === 'mutuallyExclusive' ? 25 : 1; 
                        })(),
                        slide : function(event, ui) {
                            self.model.set({'sliderValue' : ui.value});
                        }
                    
                    };
                    $slider.slider(config);
                },
                
                
                initialize : function() {

                    //console.warn('views : Evaluator.js >> collection' , this.model.collection);
                    this.render();
                    this.initSlider();
                    

                },
                render : function() {
                    this.$el.html(this.template({ model : this.model.toJSON() }));
                    //console.warn('views : Evaluator.js >> render');
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
                    switch(self.currentChildViewIndex) {
                        case self.childViews.length - 1:
                            //console.log('there is no next');
                            return;
                        case self.childViews.length - 2:
                            //console.log('last slide');
                            self.trigger('evaluators:calculateBtn:show');
                            this.getCurrentChildView().conceal(function() {
                                self.currentChildViewIndex ++;    
                            });
                            this.getCurrentChildView().reveal();
                            break;
                        default:
                            this.getCurrentChildView().conceal(function() {
                                self.currentChildViewIndex ++;    
                            });
                            this.getCurrentChildView().reveal();
                            break;
                    }
                },
                prev : function() {
                    var self = this;
                    if(self.currentChildViewIndex === 0) { 
                        //console.log('there is no prev');
                        return; 
                    }
                    this.getCurrentChildView().conceal(function() {
                        self.currentChildViewIndex --;
                    });
                    this.getCurrentChildView().reveal();
                    self.trigger('evaluators:calculateBtn:hide')
                },
                showCalculateBtn : function() {
                    $('.calculate').removeClass('hidden');

                },
                attachListeners : function() {
                    var self = this;
                    this.on('evaluators:calculateBtn:show', function(event) {
                        this.showCalculateBtn();
                    });
                    this.on('evaluators:calculateBtn:hide', function(event) {
                        this.showCalculateBtn();
                    });

                },
                initialize : function() {
                    var self = this;
                    this.render();
                    this.attachListeners();
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
                        //console.warn('___________________________ ', self.childViews);
                        self.$el.find('.evaluators').append(evaluatorView.el);                       
                        
                    });
                    // callback
                    if(cb && typeof cb === 'function') {
                        cb.call();  
                    }    
                },
                render : function() {
                    this.$el.html(this.template({}));
                    //console.log('views.js - this.collection: ', this);
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
                    },
                    'click .calculate' : function(event) {
                        event.preventDefault();
                        //console.log('calculate clicked  ');
                        this.childViews[0].model.collection.save();



                    }
                    
                }


            })



        };

        
        return views;

});

