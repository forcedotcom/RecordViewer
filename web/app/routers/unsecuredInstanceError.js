'use strict';

var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('error', {
        title: 'Unsecured Instance URL',
        message: 'The instance URL returned by the server appears to be an unsecured server. In order to use Record Viewer, the server will need to have SSL enabled so the instance_url returned uses HTTPS.'
    });
});

module.exports = router;
