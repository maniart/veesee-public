var express = require("express");
var router = express.Router();
var data = require("../data/data.json")


router.get('/', function(req, res) {
	console.log('Sending data to front-end');
	res.json(data);
});

router.post('/', function(req, res) {
	console.log('received post request. Saving collection');
	res.send({
        redirect: '#app'
    });
    
    res.end();
});	


module.exports = router;