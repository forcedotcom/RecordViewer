'use strict';

/*
 * The application can't support servers that are not HTTPS so fail with an error in that case
 */
module.exports = function(req, res, next) {
    if (req.session && req.session.instance_url && req.session.instance_url.substring(0, 5) !== 'https') {
        return res.redirect('/unsecuredInstanceError');

    } else {
        next();
    }
}