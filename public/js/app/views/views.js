/**
 * @module views
*/

var fs = require('fs'); // keeping the `var` declaration due to https://gist.github.com/maniart/4e7d3395ce0e55f2e67d
var $ = require('jquery')(window)
  , Backbone = require('backbone')
  , models = require('../models/models.js')
  , collections = require('../collections/collections.js')
  , _ = require('underscore')
  , templates = {
        home: fs.readFileSync(__dirname + '/../templates/home.html'),
        login: fs.readFileSync(__dirname + '/../templates/login.html'),
        evaluator: fs.readFileSync(__dirname + '/../templates/evaluator.html'),
        evaluators: fs.readFileSync(__dirname + '/../templates/evaluators.html'),
        results: fs.readFileSync(__dirname + '/../templates/results.html')
    }
  , views;

Backbone.$ = window.$;

views = {

    Evaluator: Backbone.View.extend({
        
        tagName: 'article',
        
        attributes: {
            'class': 'evaluator hidden' 
        },
        
        template: _.template(templates.evaluator.toString()),
        
        reveal: function reveal(cb) {
            this.$el.removeClass('hidden');
            this.animate('in');
            if(cb && typeof cb === 'function') {
                cb.call();
            }
        },
        
        conceal: function conceal(cb) {
            this.animate('out');
            this.$el.addClass('hidden');
            if(cb && typeof cb === 'function') {
                cb.call();
            }
        },
        
        animate: function animate(type) {
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
        
        initSlider: function initSlider() {
            var self = this;
            var $slider = this.$el.find('.slider');
            var config = {
                value : self.model.get('sliderValue'),
                min : 0,
                max : 100,
                step : (function() {
                    return self.model.get('sliderType') === 'mutuallyExclusive' ? 25 : 1; 
                })(),
                slide: function(event, ui) {
                    self.model.set({'sliderValue' : ui.value});
                }
            
            };
            $slider.slider(config);
        },
        
        initialize: function initialize() {
            this.render();
            this.initSlider();            
        },

        render: function render() {
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
        
        getCurrentChildView : function getCurrentChildView() {
            return this.childViews[this.currentChildViewIndex];
        },
        
        next : function next() {
            var self = this;
            switch(self.currentChildViewIndex) {
                case self.childViews.length - 1:
                    return;
                case self.childViews.length - 2:
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
        
        prev : function prev() {
            var self = this;
            if(self.currentChildViewIndex === 0) { 
                return; 
            }
            this.getCurrentChildView().conceal(function() {
                self.currentChildViewIndex --;
            });
            this.getCurrentChildView().reveal();
            self.trigger('evaluators:calculateBtn:hide');
        },
        
        showCalculateBtn: function showCalculateBtn() {
            this.$('.calculate').removeClass('hidden');
        },
        
        hideCalculateBtn: function hideCalculateBtn() {
            this.$('.calculate').addClass('hidden');
        },
        
        attachListeners: function attachListeners() {
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
        
        initialize: function initialize() {
            var self = this;
            this.render();
            this.attachListeners();
            this.populateChildViews(function() {
                self.getCurrentChildView().reveal();    
            });
            console.warn('>>>> my collection is: ', this.collection);
        },
        
        populateChildViews: function populateChildViews(cb) {
            var self = this,
                evaluatorView;
            
            this.collection.each(function(evaluatorModel) {
            
                evaluatorView = new views.Evaluator({ model : evaluatorModel });
                self.childViews.push(evaluatorView);
                self.$el.find('.evaluators').append(evaluatorView.el);                       
                
            });
            if(cb && typeof cb === 'function') {
                cb.call();  
            }    
        },
        
        render: function render() {
            this.$container.html('');
            this.$el.html(this.template({}));
            var self = this;
            this.collection.each(function(evaluatorModel) {
                var evaluatorView = new views.Evaluator({ model : evaluatorModel });
                self.$el.append(evaluatorView.el);                       
                
            });
            this.$container.append(self.$el);    
        },

        events : {
            'click .next': function next(event) {
                event.preventDefault();
                this.next();
                
            },
            'click .prev': function prev(event) {
                event.preventDefault();
                this.prev();
            },
            'click .calculate': function calculate(event) {
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
        
        render : function render() {
            this.$el.html(this.template({ model : this.model.toJSON() }));
            this.$container.html('').append(this.$el);
        },
        
        initialize : function initialize() {
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
        
        render: function render() {
            this.$el.html(this.template({}));
            this.$container.html('').append(this.$el);
        },
        
        initialize: function initialize(){
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
        
        render : function render(data) {
            this.$el.html(this.template({token: this.model.get('csrfToken')}));
            this.$container.html('').append(this.$el);
        },
        initialize : function initialize(){
            var render = _.bind(this.render, this);
            this.model.on('change', render);
            this.model.fetch({
                success: function success(model, response, options) {
                    console.debug('fetch success:', model, response, options);    
                },
                error: function error(model, response, options) {
                    console.debug('fetch error:', model, response, options);
                }

            });
            console.warn('login view');
        },
        toggleForms : function toggleForms() {
            this.$('.login, .signup').toggle();
        },
        
        events : {
            'click .js-show-signup': 'toggleForms',
            'click .js-show-login': 'toggleForms'
        }

    })



};

module.exports = views;

