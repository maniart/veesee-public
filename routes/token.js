/* @module token */


/* imports */

var express = require('express')
  , router = express.Router();


/* routes */

router.get('/token', function(req, res) {
	res.json({
		csrfToken: req.csrfToken()
	});
});


/* exports */

module.exports = router;