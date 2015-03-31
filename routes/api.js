/* @module api */


/* imports */
var express = require('express')
  , router = express.Router()


/* modules */  

  , calculator = require('../controllers/calculator')
  , data = require('../data/data.json');


/* middleware */

function addResult(req, res, next) {
	req.result = calculator.calculate(req.body);
	next();
};


/* routes */

router.get('/', function(req, res) {
	res.json(data);
});

router.post('/', addResult, function(req, res) {
	res.json(req.result);
});	


/* exports */

module.exports = router;