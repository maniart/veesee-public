/* @module AuthModel */


/* imports */

var $ = require('jquery')(window)
  , Backbone = require('backbone')


/* modules */

  , BaseModel = require('./BaseModel')
  , SessionModel = require('./SessionModel')

Backbone.$ = window.$;


/* exports */

module.exports = BaseModel.extend({

}, {
	session: SessionModel.create({})
});

