var express = require("express");
var router = express.Router();
var path = require('path');


router.get('/', function(req, res, next) {
	res.sendFile('login.html', { root:path.join(__dirname, '/../public/') }, function(err) {
		if(err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('Sent: login.html');
		}
	});	
	next();
});

module.exports = router;