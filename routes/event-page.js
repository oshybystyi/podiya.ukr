
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

            var backUrl = '/' + helper.toUrl(doc.city),
                backUrlTitle = 'До списку подій у місті ' + doc.city;

            if (doc.date < new Date()) {
                // If event in the archive already than back link should be
                // ponting to this list
                backUrl += '/архів';
                backUrlTitle = 'До архіву подій у місті ' + doc.city;
            }

            if (doc !== null) {
                res.render('event-page', {
                    title: doc.name + ' у місті ' + doc.city,
                    env: app.get('env'),
                    ev: doc,
                    backUrl: backUrl,
                    backUrlTitle: backUrlTitle
                });
            } else {
                next();
            }
        });
    });

    return router;
}
