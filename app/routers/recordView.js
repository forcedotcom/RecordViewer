'use strict';

var express = require('express'),
    router = express.Router(),
    auth = require('../middlewares/auth'),
    config = require('../config'),
    unsecuredInstanceCheck = require('../middlewares/unsecuredInstanceCheck');

router.get('/', auth, unsecuredInstanceCheck, function(req, res) {

  res.render('recordView', {
    accessToken: req.session.access_token,
    targetUrl: req.session.instance_url,
    recordId: req.query.recordId,
    layoutType: req.query.layoutType,
    formFactor: req.query.formFactor
  });
});

module.exports = router;
