const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default data from the PingPong server.',
}));

const http = require('http');
const port = parseInt(process.env.PORT, 10) || 8081;
app.set('port', port);
console.log("Starting API server on port", port);
const server = http.createServer(app);
server.listen(port);

module.exports = app;