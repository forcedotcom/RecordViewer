'use strict';

var express = require('express'),
    router = express.Router();

router.use('/', require('./indexRedirect'));
router.use('/connectProxy', require('./connectProxy'));
router.use('/login', require('./login'));
router.use('/oauth-finish', require('./oauthFinish'));
router.use('/oauth-redirect', require('./oauthRedirect'));
router.use('/recordView', require('./recordView'))
router.use('/unsecuredInstanceError', require('./unsecuredInstanceError'));

module.exports = router;
