/* @module EvaluatorModel */
/*TODO rename to `InputModel` */

/* imports */

var $ = require('jquery')(window)
  , Backbone = require('backbone')


/* modules */

  , BaseModel = require('./BaseModel');

Backbone.$ = $;


/* exports */

module.exports = BaseModel.extend({

	defaults: {
		sliderValue: 50
	}

});
