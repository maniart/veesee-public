var express = require("express");
var router = express.Router();
var data = require("../data/data.json")


router.get('/', function(req, res) {
	console.log('Sending data to front-end');
	//console.log('data is: ', data);
	res.json(data);
});


module.exports = router;