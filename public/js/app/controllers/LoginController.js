/* @module homeController */


/* modules */

var Model = require('../models/loginModel')
  , View = require('../views/loginView');


/* exports */

module.exports = function about() {
	  
  View.create({ 
  	model: Model.create() 
  });

};
