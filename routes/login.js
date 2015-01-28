var express = require("express")
  , router = express.Router()
  , path = require('path')
  , csrf = require('csurf');

// pass the csrfToken to the view
router.get('/', function(req, res) {
	console.log('token: ', req.csrfToken());
	res.json({ csrfToken: req.csrfToken() });
	res.json({ csrfToken: 'foobar' });
});

module.exports = router;