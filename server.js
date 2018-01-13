/* MIT License
*
*  Copyright (c) 2017 Luke Brown
*  
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*  
*  The above copyright notice and this permission notice shall be included in all
*  copies or substantial portions of the Software.
*  
*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*  SOFTWARE.
*/
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const csp = require('express-csp-header');
const helmet = require('helmet');
const history = require('connect-history-api-fallback');

// init app
const app = express();

/*
*
* App Options
*
*/

//enable pre-flight, needs to come before other routes
app.options('*', cors()); 

/*
*
* Serve Files
*
*/

// [prod] serve files from dist
app.use(serveStatic(__dirname + "/dist"));

/*
*
* Database Configuration
*
*/

// database URI
const db_uri = process.env.MONGODB_URI

// init db connection
mongoose.connect(db_uri, { useMongoClient: true });

// override mongoose promise because it is depricated
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback) {
  console.log('Database Connected');
});

/*
*
* Middleware
*
*/

// HTTP header hardening
// https://helmetjs.github.io/docs/
app.use(helmet({
  frameguard: { action: "deny" }
}));

// Content Security Policy settings
const cspMiddleware = csp({
  policies: {
    'default-src': [csp.NONE],
    'script-src': [csp.NONCE],
    'style-src': [csp.NONCE],
    'img-src': [csp.SELF],
    'font-src': [csp.NONCE, 'fonts.gstatic.com'],
    'object-src': [csp.NONE],
    'block-all-mixed-content': true,
    'frame-ancestors': [csp.NONE]
  }
});
app.use(cspMiddleware);

// HTTP request logger
// https://www.npmjs.com/package/morgan
app.use(morgan('combined'));

// Parse incoming request bodies
// https://www.npmjs.com/package/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));

// Enable Cross-Origin-Resource-Shring
// https://www.npmjs.com/package/cors
app.use(cors());

// Proxy requests through a specified index page, used for SPA's which use the
// HTML5 History API.
// https://www.npmjs.com/package/connect-history-api-fallback
app.use(history());

// Error handling
const displayErrors = async (error, req, res, next) => {
  if(error.status !== 200){
    res.status(error.status || 500).send({ error: error._message });
    // res.send('error', { error });
  }
}
app.use(displayErrors);

/*
*
* Routes
*
*/

// init app router
app.use('/api', api);

// handle unhandled promise rejections to be prevent node app crash
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error);
});

/*
*
* End Middleware
*
*/

/*
*
* Webserver
*
*/
const port = process.env.PORT || 5000;

// init webserver
app.listen(port, (port) => {
  console.log('Node app is running on port', port);
});
