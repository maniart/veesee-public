/**
 * Describes the all view constructors
 * @module views
*/

var fs = require('fs');
var $ = require('jquery')(window);
var Backbone = require('backbone');
var models = require('../models/models.js');
var collections = require('../collections/collections.js');
var _ = require('underscore');
Backbone.$ = window.$;

var templates = {
    home: fs.readFileSync(__dirname + '/../templates/home.html'),
    login: fs.readFileSync(__dirname + '/../templates/login.html'),
    evaluator: fs.readFileSync(__dirname + '/../templates/evaluator.html'),
    evaluators: fs.readFileSync(__dirname + '/../templates/evaluators.html'),
    results: fs.readFileSync(__dirname + '/../templates/results.html'),
    heading: fs.readFileSync(__dirname + '/../templates/heading.html')
};

var views = {

    Evaluator : Backbone.View.extend({
        
        tagName : 'article',
        attributes : {
            'class' : 'evaluator hidden' 
        },
        template : _.template(templates.evaluator.toString()),
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
                        this.$(this).removeClass('fadeInDown animated');
                    }); 
                break;
                case 'out':
                    this.$el.addClass('fadeOutDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        this.$(this).removeClass('fadeOutDown animatepd');
                    }); 
                break;
                default:
                    this.$el.addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        this.$(this).removeClass('fadeInDown animated');
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
                    return self.model.get('sliderType') === 'mutuallyExclusive' ? 25 : 1; 
                })(),
                slide : function(event, ui) {
                    self.model.set({'sliderValue' : ui.value});
                }
            
            };
            $slider.slider(config);
        },
        attachListeners : function() {

        },
        
        initialize : function() {

            //console.warn('views : Evaluator.js >> collection' , this.model.collection);
            this.render();
            this.initSlider();
            

        },
        render : function() {
            this.$el.html(this.template({ model : this.model.toJSON() }));
            console.warn('model is: ', this.model);
            return this;
        }

    }),


    Evaluators : Backbone.View.extend({

        $container : (function() {
            return this.$ && this.$('.app-container');
        })(),
        
        template : _.template(templates.evaluators.toString()),
        tagName : 'section', 
        attributes : {
            'class' : 'row evaluators-container'
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
            self.trigger('evaluators:calculateBtn:hide');
        },
        showCalculateBtn : function() {
            this.$('.calculate').removeClass('hidden');
        },
        hideCalculateBtn : function() {
            this.$('.calculate').addClass('hidden');
        },
        attachListeners : function() {
            var self = this;
            this.on('evaluators:calculateBtn:show', function(event) {
                this.showCalculateBtn();
            });
            this.on('evaluators:calculateBtn:hide', function(event) {
                this.hideCalculateBtn();
            });
            this.collection.on('save', function(event) {
                self.$el.fadeOut(300, function() {
                    console.warn('creating the results view, mode: ', event.resultsModel);
                    new views.Results({ model : event.resultsModel });    
                });

                
            });
        },
        initialize : function() {
            var self = this;
            this.render();
            this.attachListeners();
            this.populateChildViews(function() {
                self.getCurrentChildView().reveal();    
            });
            console.warn('>>>> my collection is: ', this.collection);
        },
        populateChildViews : function(cb) {
            var self = this,
                evaluatorView;
            
            this.collection.each(function(evaluatorModel) {
            
                evaluatorView = new views.Evaluator({ model : evaluatorModel });
                self.childViews.push(evaluatorView);
                self.$el.find('.evaluators').append(evaluatorView.el);                       
                
            });
            // callback
            if(cb && typeof cb === 'function') {
                cb.call();  
            }    
        },
        render : function() {
            this.$container.html('');
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
                this.childViews[0].model.collection.save();

            }
            
        }


    }),

    Results : Backbone.View.extend({

        template : _.template(templates.results.toString()),
        tagName : 'section', 
        $container : (function() {
            return this.$ && this.$('.app-container');
        })(),
        attributes : {
            'class' : 'row evaluation-results'
        },
        render : function() {
            this.$el.html(this.template({ model : this.model.toJSON() }));
            this.$container.html('').append(this.$el);
        },
        initialize : function() {
            this.render();
            console.warn('results view initialized.');
        }  
    
    }),

    Home : Backbone.View.extend({
        $container : (function() {
            return this.$ && this.$('.app-container');
        })(),
        template : _.template(templates.home.toString()),
        tagName : 'section',
        attributes : {
            'class' : 'home-view'
        },
        render : function() {
            this.$el.html(this.template({}));
            this.$container.html('').append(this.$el);
        },
        initialize : function(){
            console.warn('home view');
            this.render();
        }

    }),

    Login : Backbone.View.extend({
        $container : (function() {
            return this.$ && this.$('.app-container');
        })(),
        template : _.template(templates.login.toString()),
        tagName : 'section',
        attributes : {
            'class' : 'login-view'
        },
        render : function() {
            this.$el.html(this.template({}));
            this.$container.html('').append(this.$el);
        },
        initialize : function(){
            console.warn('login view');
            this.render();
        },
        toggleForms : function() {
            this.$('.login, .signup').toggle();
        },
        
        events : {
            'click .js-show-signup' : 'toggleForms',
            'click .js-show-login' : 'toggleForms'
        }

    })



};

module.exports = views;

