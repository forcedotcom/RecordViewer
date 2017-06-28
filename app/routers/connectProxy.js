'use strict';

var express = require('express'),
    router = express.Router(),
    config = require('../config'),
    http = require('http'),
    https = require('https'),
    auth = require('../middlewares/auth');

router.all('/', auth, function(req, res) {
    var headers = {
        'Authorization' : 'Bearer ' + req.session.access_token
    };
    var path = req.query.url;
    var usingQueryParams = false;
    var isFirst = true;
    var qpKeys = Object.keys(req.query);

    if (qpKeys.length > 1) {
        usingQueryParams = true;

        qpKeys.forEach(function(qKey) {
            if (qKey != "url") {
                if (isFirst) {
                    path = path + "?";
                    isFirst = false;
                } else {
                    path = path + "&";
                }

                path = path + qKey + "=" + encodeURIComponent(req.query[qKey]);
            }
        });
    }

    var options = {
      path: '/services/data/v' + config.currentVersion + '.0' + path,
      method: req.method,
      headers: headers
    }

    options.hostname = req.session.url_prefix
    options.port = config.proxySettings.port
    var useHttps = config.proxySettings.secure

    var usingBody = req.method != 'GET' && req.method != 'DELETE' && !usingQueryParams && req.body;

    if (usingBody) {
        var postBody = JSON.stringify(req.body)
        options.headers['Content-Type'] = 'application/json';
        options.headers['Content-Length'] = postBody.length;
    }

    // if the proxy settings are set to secure use https to make the request
    var reqOut = (useHttps ? https : http).request(options, function(response) {
        str = '';

        response.on('data', function (chunk) {
          str += chunk;
        });

        response.on('end', function () {
          res.write(str);
          res.end();
        });
    }).on('error', function(e) {
        res.write('error: ' + JSON.stringify(e));
        res.end();
    });

    if (usingBody) {
        reqOut.write(postBody);
    }

    reqOut.end();
});

module.exports = router;
