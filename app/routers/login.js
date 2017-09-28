'use strict';

var express = require('express'),
    router = express.Router(),
    config = require('../config'),
    querystring = require('querystring');

router.get('/', function(req, res){
    // Where oauth-finish should redirect the browser to after login.
    var state = querystring.escape(req.query.afterUrl ? req.query.afterUrl : ''),
        redirectPath = '/oauth-redirect';

    res.render('login', {
        title: 'Login',
        defaultLoginUrl: req.query.loginUrl || config.defaultLoginUrl || '',
        defaultConsumerKey: req.query.consumerKey || config.defaultConsumerKey || '',
        state: state,
        redirectPath: redirectPath
    });

});

module.exports = router;
