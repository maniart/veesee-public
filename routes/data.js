var express = require("express");
var router = express.Router();
var data = require("../data/data.json")


router.get('/', function(req, res) {
	console.log('Sending data to front-end');
	res.json(data);
});


module.exports = router;