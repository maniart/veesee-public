/* @module homeController */


/* modules */

var Model = require('../models/homeModel')
  , View = require('../views/homeView');


/* exports */

module.exports = function home() {
	  
  View.create({ 
  	model: Model.create() 
  });

};
