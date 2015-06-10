
var app = require('express')();

// mostly std stuff from `express app`
require('./bootstrap/boilerplate')(app);

// db
require('./bootstrap/db')(app);

// session initialization
require('./bootstrap/session')(app);

// authorization for secured areas
require('./bootstrap/authorization')(app);

// routes
require('./bootstrap/routes')(app);

// 404, 500 error handlers
require('./bootstrap/error-handlers')(app);

module.exports = app;
