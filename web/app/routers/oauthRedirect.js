'use strict';

var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('oauth-redirect', {
        title : 'OAuth Redirect'
    });
});

module.exports = router;
