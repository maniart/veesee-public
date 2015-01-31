var express = require("express");
var router = express.Router();
var data = require("../data/data.json"),
	csrf = require('csurf');


router.get('/', function(req, res, next) {
	res.json(data);
});

router.get('/token', function(req, res, next) {
	res.json({ csrfToken: req.csrfToken() });
});

module.exports = router;