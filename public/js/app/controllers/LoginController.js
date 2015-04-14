/* @module homeController */


/* modules */

var Model = require('../models/loginModel')
  , View = require('../views/loginView');


/* exports */

module.exports = function login() {
	  
  View.create({ 
  	model: Model.create() 
  });

};
