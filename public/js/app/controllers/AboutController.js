/* @module homeController */


/* imports */


/* modules */

var Model = require('../models/aboutModel')
  , View = require('../views/aboutView');


/* exports */

module.exports = function about() {
	  
  View.create({ 
  	model: Model.create({title: 'foo'}) 
  });

};
