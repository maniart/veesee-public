/* @module home */


/* imports */

var express = require("express")
  , router = express.Router()
  , data = require('../data/data.json')


/* routes */

router.get('/', function(req, res) {
	res.json(data);
});


/* exports */

module.exports = router;