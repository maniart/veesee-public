/* @module UserModel */


/* imports */

var $ = require('jquery')(window)
  , Backbone = require('backbone')


/* modules */

  , BaseModel = require('./BaseModel');

Backbone.$ = $;


/* exports */

module.exports = BaseModel.extend({

	defaults: {
    id: 0,
    name: '',
    organization: '',
    email: ''
  }

});