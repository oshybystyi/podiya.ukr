
var session = require('express-session');

// mongo session store
var MongoSessionStore = require('connect-mongo')(session);

module.exports = function(app) {
    app.use(session({
        secret: 'events session',
        resave: false,
        saveUninitialized: false,
        store: new MongoSessionStore({
            db: 'events-app'
        })
    }));
}
