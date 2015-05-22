
/**
 * Initializing mongodb database
 */

var MongoClient = require('mongodb').MongoClient,
    config = require('../appconfig');

module.exports = function(app) {
    app.use(function(req, res, next) {
        MongoClient.connect('mongodb://127.0.0.1:27017/' + config.db,
            function(err, db) {
                if (err) {
                    var error = new Error('Database connection failed:' + err);
                    error.type = 'db';
                    next(error);
                } else {
                    req.db = db;
                    next();
                }
            }
        );
    });
}
