var express = require('express');
var calculator = require('../controllers/calculator');
var router = express.Router();
var data = require("../data/data.json")
var addResult = function(req, res, next) {
	
	req.result = calculator.calculate(req.body);
	next();

};

router.get('/', function(req, res) {
	console.log('Sending data to front-end');
	res.json(data);
});

router.post('/', addResult, function(req, res, next) {
	res.json(req.result);
});	


module.exports = router;