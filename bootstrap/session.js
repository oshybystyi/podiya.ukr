
/**
 * Session initialization
 */

var session = require('express-session'),
    config = require('../appconfig');

// mongo session store
var MongoSessionStore = require('connect-mongo')(session);

module.exports = function(app) {
    app.use(session({
        secret: 'events session',
        resave: false,
        saveUninitialized: false,
        store: new MongoSessionStore({
            db: config.db
        })
    }));
}
