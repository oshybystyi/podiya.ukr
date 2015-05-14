
var app = require('express')();

// mostly std stuff from `express app`
require('./bootstrap/boilerplate')(app);

// session initialization
require('./bootstrap/session')(app);

// routes
require('./bootstrap/routes')(app);

// 404, 500 error handlers
require('./bootstrap/error-handlers')(app);

module.exports = app;
