/* @module ReportCardView */


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

  template : _.template(templates.results.toString()),
  
  tagName : 'section', 

  $container : this.$('.app-container'),
  
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