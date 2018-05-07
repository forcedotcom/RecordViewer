'use strict';

var bodyParser = require('body-parser')
  , config = require('./app/config')
  , cookieParser = require('cookie-parser')
  , express = require('express')
  , fs = require('fs')
  , http = require('http')
  , https = require('https')
  , morgan = require('morgan')
  , serveStatic = require('serve-static')
  , session = require('express-session')
  , stylus = require('stylus');

// Loads up the file at the given path with the given charset. If the file does
// not exist, then an undefined is returned (instead of throwing an error). This
// process is synchronous.
function loadFileAsStringOrUndefined(filePath, charset) {
  try {
    fs.statSync(filePath, charset)
  } catch (e) {
    // an error will be thrown when the file does not exist so catch it
    // and return undefined
    return undefined;
  }
  return fs.readFileSync(filePath, charset).toString();
}

// Loads up the SSL credentials that can be used with the https module. If the key
// or certificate cannot be found, then an undefined is returned.
function loadSslCredentials() {
  var privateKey = loadFileAsStringOrUndefined(config.privateKeyFilePath, 'utf8'),
    certificate = loadFileAsStringOrUndefined(config.certificateFilePath, 'utf8');

  if (!privateKey || !certificate) {
    return undefined;
  }

  return {key: privateKey, cert: certificate}
}

// Starts the HTTP server with the given Express app
function startHttpServer(app) {
  var httpServer;

  try {
      httpServer = http.createServer(app);
      httpServer.on('error', httpError);
      httpServer.listen(config.httpPort);

      // if the app is being served through nginx, show the nginx information
      // instead of the HTTP port for the app
      if (process.env.NGINX_PORT) {
        console.log('Server started: https://localhost:' + process.env.NGINX_PORT);
      } else {
        console.log('Server started on HTTP: ' + config.httpPort);
      }

  } catch (e) {
    console.error('Error while starting HTTP server on ' + config.httpPort + ':');
    console.error(e);
    throw e;
  }
}

// Starts the HTTPS server with the given Express app
function startHttpsServer(app) {
  var httpServer;
  var credentials = loadSslCredentials();

  if (!credentials) { console.log('SSL issue'); }

  try {
      httpServer = https.createServer(credentials, app);
      httpServer.on('error', httpError);
      httpServer.listen(config.httpsPort);
      console.log('Server started on HTTPS: ' + config.httpsPort);
  } catch (e) {
    console.error('Error while starting HTTPS server on ' + config.httpsPort + ':');
    console.error(e);
    throw e;
  }
}

function httpError(exception, socket) {
  console.error('An error occurred with the HTTP server:\n' + exception);
}

var app = express();
// use Pug view templates
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// make JSON bodies and cookies available in req objects
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'asdfasfdsafsdfsd'
}));

// use morgan for request logging
app.use(morgan('dev'));

// statically serve SLDS, the files in /public, and the babel-ified js in /lib
app.use('/libs/salesforce-ux/design-system', serveStatic(__dirname + '/node_modules/@salesforce-ux/design-system/assets'))
app.use('/libs/jquery', serveStatic(__dirname + '/node_modules/jquery/dist/'))
app.use(serveStatic(__dirname + '/public'));
app.use(serveStatic(__dirname + '/lib'));

// use routers from app/routers/index.js
app.use(require('./app/routers'));

process.on('uncaughtException', function(err) {
  console.log(err);
  process.exit(1);
});

// start the web server.
if (config.useHttps) {
  startHttpsServer(app);
} else {
  startHttpServer(app);
}
