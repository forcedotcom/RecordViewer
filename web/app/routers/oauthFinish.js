'use strict';

var express = require('express'),
    config = require('../config'),
    router = express.Router();

router.get('/', function(req, res) {
    if (req.query.access_token) {
        req.session.access_token = req.query.access_token
        req.session.id_url = req.query.id

        var instanceUrl = req.session.instance_url = req.query.instance_url
        var firstColonIndex = instanceUrl.indexOf(":")
        var colonIndex = -1
        if (firstColonIndex > -1) {
            colonIndex = instanceUrl.substr(firstColonIndex + 1).indexOf(":")
            if (colonIndex > -1) {
                colonIndex = firstColonIndex + 1 + colonIndex
            }
        }

        var startIndex = instanceUrl.indexOf("//") + 2
        if (colonIndex > -1) {
            var length = colonIndex - startIndex;
            req.session.url_prefix = instanceUrl.substr(startIndex, length);
        } else {
            req.session.url_prefix = instanceUrl.substr(startIndex);
        }
    }

    if (req.query.state && req.query.state.length > 0) {
        res.redirect(req.query.state);
    } else {
        res.redirect('/');
    }
});

module.exports = router;
