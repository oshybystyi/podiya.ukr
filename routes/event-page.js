
var router = require('express').Router(),
    helper = require('../components/Helper'),
    Event = require('../models/Event'),
    moment = require('moment');

module.exports = function(app) {
    router.use(function(req, res, next) {

        Event.findOne({_encodedUrl: req.originalUrl.toLowerCase()}, function(err, doc) {
            if (err) {
                err.type = 'db-event-search';
                next(err);
            }

            if (doc !== null) {
                var backUrl = '/' + helper.toUrl(doc.city),
                    backUrlTitle = 'До списку подій у місті ' + doc.city;

                if (doc.date < new Date()) {
                    // If event in the archive already than back link should be
                    // ponting to this list
                    backUrl += '/архів';
                    backUrlTitle = 'До архіву подій у місті ' + doc.city;
                }

                res.render('event-page', {
                    title: doc.name + ' у місті ' + doc.city,
                    env: app.get('env'),
                    ev: doc,
                    backUrl: backUrl,
                    backUrlTitle: backUrlTitle,
                    moment: moment,
                    editEvUrlPrefix: '/адмінка/редагувати-подію/'
                });
            } else {
                // It is not event url
                next();
            }
        });

    });

    return router;
}
