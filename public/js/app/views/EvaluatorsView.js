/* @module EvaluatorsView */


/* imports */

// keeping the `var`: https://gist.github.com/maniart/4e7d3395ce0e55f2e67d
var fs = require('fs');
var $ = require('jquery')(window)
  , Backbone = require('backbone')
  , _ = require('underscore')


/* modules */
  
  , BaseModel = require('./BaseModel')
  , BaseView = require('./BaseView')
  , EvaluatorView = require('./EvaluatorView')
  , ReportCardView = require('./ReportCardView');

Backbone.$ = window.$;


/* exports */

modules.exports = BaseView.extend({

  $container : this.$('.app-container'),

  template : _.template(fs.readFileSync(__dirname + '/../templates/evaluator.html').toString()),
        
  tagName : 'section', 
        
  attributes : {
      'class' : 'row evaluators-container'
  },
        
  childViews : [],
        
  currentIndex : 0,
        
  getCurrentChildView : function getCurrentChildView() {
      return this.childViews[this.currentIndex];
  },
        
  next : function next() {
    var self = this;
    switch(self.currentIndex) {
      case self.childViews.length - 1:
        return;
      case self.childViews.length - 2:
        self.trigger('evaluators:calculateBtn:show');
        this.getCurrentChildView().conceal(function() {
            self.currentIndex ++;    
        });
        this.getCurrentChildView().reveal();
        break;
      default:
        this.getCurrentChildView().conceal(function() {
            self.currentIndex ++;    
        });
        this.getCurrentChildView().reveal();
        break;
    }
  },
        
  prev : function prev() {
    var self = this;
    if(self.currentIndex !== 0) {  
      this.getCurrentChildView().conceal(function() {
          self.currentIndex --;
      });
      this.getCurrentChildView().reveal();
      self.trigger('evaluators:calculateBtn:hide');
    }
  },
        
  showCalculateBtn: function showCalculateBtn() {
      this.$('.calculate').removeClass('hidden');
  },
        
  hideCalculateBtn: function hideCalculateBtn() {
      this.$('.calculate').addClass('hidden');
  },

  populateChildViews: function populateChildViews(done) {
    var self = this
      , evaluatorView;
      
    this.collection.each(function(evaluatorModel) {
      evaluatorView = new views.Evaluator({ model : evaluatorModel });
      self.childViews.push(evaluatorView);
      self.$el.find('.evaluators').append(evaluatorView.el);                           
    });
    done && done();
  },
        
  afterRender: function afterRender() {
    var self = this;
    this.on('evaluators:calculateBtn:show', this.showCalculateBtn);
    this.on('evaluators:calculateBtn:hide', this.hideCalculateBtn);
    this.collection.on('collection:save:success', function(event) {
      self.$el.fadeOut(300, function() {
        console.warn('creating the results view, mode: ', event.resultsModel);
        ReportCardView.create({ model: BaseModel.create(JSON.parse(event.results) });    
      });  
    });
    this.populateChildViews(function() {
        self.getCurrentChildView().reveal();    
    });
  },
    
  _render: function _render() {
    var self = this
      , evaluatorView;
    this.$container.html('');
    this.$el.html(this.template({}));
    this.collection.each(function(evaluatorModel) {
        evaluatorView = EvaluatorView.create({ model : evaluatorModel });
        self.$el.append(evaluatorView.el);                       
        
    });
    this.$container.append(self.$el);    
  },

  events: {
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

});