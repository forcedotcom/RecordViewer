var querystring = require('querystring');

// Middleware for restricting a URL to require the user to be logged in
module.exports = function(req, res, next) {
    if (!req.session.access_token) {
        res.redirect('/login?afterUrl=' + querystring.escape(req.url))
    } else {
        next()
    }
};
