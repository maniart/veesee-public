/* @module homeController */


/* imports */


/* modules */

var Model = require('../models/aboutModel')
  , View = require('../views/aboutView');


/* exports */

module.exports = function home() {
	  
  console.log('about controller');
  View.create({ model: Model.create() });

};
