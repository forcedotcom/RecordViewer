var homedir = require('os-homedir');

var proxySettings = {
    // set to true to enable a proxy instead of using CORS
    enabled: false, // process.env.PROXY_ENABLE === 'true',

    // set to true if the proxy should connect to the server over HTTPS
    secure: (process.env.PROXY_SECURE || 'true') === 'true',

    // the port of the server to connect to from the proxy
    port:   process.env.PROXY_PORT || 443,
};

module.exports = {

    // use HTTPS?
    useHttps: false,

    // the path to the SSL key and cert. only used if useHttps is true
    privateKeyFilePath: 'nginx/ssl.key',
    certificateFilePath: 'nginx/ssl.crt',

    // http port
    httpPort: process.env.PORT || 3001,

    // https port
    httpsPort: 3001,

    // the URL to the server that will provide authentication
    defaultLoginUrl: process.env.LOGIN_URL,

    // the consumer key of the connected app on the server
    defaultConsumerKey: process.env.CONSUMER_KEY,

    // API version
    currentVersion: 42,

    proxySettings: proxySettings
};
