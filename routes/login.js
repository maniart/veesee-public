var express = require("express")
  , router = express.Router()
  , path = require('path')
  , csrf = require('csurf');



// pass the csrfToken to the view
router.get('/', function(req, res) {
  //res.json({ csrfToken: req.csrfToken() });
  res.json({ csrfToken: 'foobar' });
});

module.exports = router;