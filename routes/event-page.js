
var router = require('express').Router(),
    helper = require('../components/Helper');

module.exports = function(app) {
    router.use(function(req, res, next) {
        var collection = req.db.collection('events');

        collection.findOne({_encodedUrl: req.originalUrl.toLowerCase()}, {}, function(err, doc) {
            if (err) {
                err.type = 'db-event-search';
                next(err);
            }

            if (doc !== null) {
                res.render('event-page', {
                    title: doc.name + ' у місті ' + doc.city,
                    env: app.get('env'),
                    ev: doc,
                    backUrl: '/' + helper.toUrl(doc.city),
                    city: doc.city
                });
            } else {
                next();
            }
        });
    });

    return router;
}
