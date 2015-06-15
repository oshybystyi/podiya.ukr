
/**
 * Initializing mongodb database
 */

var mongoose = require('mongoose'),
    config = require('../default-config.json').mongoAppDb,
    connectionString = 'mongodb://' + config.host + ':27017/' + config.db;

module.exports = function(app) {
    app.use(function(req, res, next) {
        if (mongoose.connection.readyState === 0) {
            mongoose.connect(connectionString, {}, function(err) {
                if (err) {
                    err.type = 'db:connection';
                    return next(err);
                }

                return next();
            });
        } else {
            next();
        }
    });
}
