/* @module LoginModel */


/* imports */

var $ = require('jquery')(window)
  , Backbone = require('backbone')


/* modules */

  , AuthModel = require('./AuthModel');

Backbone.$ = $;


/* exports */

module.exports = AuthModel.extend({

	url: '/token'

});