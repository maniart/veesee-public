/* @module EvaluatorView */


/* imports */

// keeping the `var`: https://gist.github.com/maniart/4e7d3395ce0e55f2e67d
var fs = require('fs');
var $ = require('jquery')(window)
  , Backbone = require('backbone')
  , _ = require('underscore')


/* modules */

  , BaseView = require('./BaseView');

Backbone.$ = window.$;



/* exports */

module.exports = BaseView.extend({
  
  template: _.template(fs.readFileSync(__dirname + '/../templates/evaluator.html').toString()),      
  
  tagName: 'article',
    
  attributes: {
      'class': 'evaluator hidden' 
  },

  reveal: function reveal(done) {
    this.$el.removeClass('hidden');
    this.animate('in', done);
  },
    
  conceal: function conceal(done) {
    this.animate('out', done);
    this.$el.addClass('hidden');
  },
    
  animate: function animate(type, done) {
    switch(type) {
      case 'in':
          this.$el.addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              this.$(this).removeClass('fadeInDown animated');
              done && done();
          }); 
      break;
      case 'out':
          this.$el.addClass('fadeOutDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              this.$(this).removeClass('fadeOutDown animated');
              done && done();
          }); 
      break;
      default:
          this.$el.addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              this.$(this).removeClass('fadeInDown animated');
              done && done();
          }); 
      break;
    } 
  },
    
  initSlider: function initSlider() {
    var self = this
      , $slider = this.$el.find('.slider')
      , config = {
          value : self.model.get('sliderValue'),
          min: 0,
          max: 100,
          step: self.model.get('sliderType') === 'mutuallyExclusive' ? 25 : 1,
          slide: function slide(event, ui) {
              self.model.set({'sliderValue' : ui.value});
          }
        }
    };
    $slider.slider(config);

  },

  afterRender: function afterRender() {
    this.initSlider();
    return BaseView.prototype.afterRender.apply(this, arguments);
  },
    
  _render: function _render() {
    this.$el.html(this.template({ model : this.model.toJSON() }));
    return this;
  }

});

