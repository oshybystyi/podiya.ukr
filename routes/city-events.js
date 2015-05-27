
var router = require('express').Router();

module.exports = function(app) {

    router.get('^/:city$', function(req, res, next) {
        var city = req.params.city.replace('-', ' ');
        var cityReg = new RegExp('^' + city + '$', 'i');
        var collection = req.db.collection('events');

        collection.find({city: cityReg}).toArray(function(err, docs) {
            if (err) {
                err.type = 'db:city-events';
                return next(err);
            } else if (docs.length > 0) {
                // There are events for this city - so not a 404

                var findSelector = {
                    city: cityReg,
                    date: {
                        $gte: new Date()
                    }
                };

                // Making another query to display events starting from current
                // date
                collection.find(findSelector).toArray(function(err, currentEvents) {
                    if (err) {
                        err.type = 'db:city-events:current';
                        return next(err);
                    }

                    // quite a hack to avoid using changed req.params.city
                    var cityName = docs[0].city;

                    res.render('city-events', {
                        title: 'Події у місті ' + cityName + ' (Афіша)',
                        city: cityName,
                        events: currentEvents,
                        env: app.get('env'),
                        originalUrl: req.originalUrl,
                        isArchive: false
                    });
                });

            } else {
                // It is not a city from db
                next();
            }
        });
    });

    router.get('^/:city/' + encodeURIComponent('архів') + '$', function(req, res, next) {
        var city = req.params.city.replace('-', ' ');
        var cityReg = new RegExp('^' + city + '$', 'i');
        var collection = req.db.collection('events');

        collection.find({city: cityReg}).toArray(function(err, docs) {
            if (err) {
                err.type = 'db:city-events-archive';
                return next(err);
            } else if (docs.length > 0) {
                // There are events for this city - so not a 404
                var findSelector = {
                    city: cityReg,
                    date: {
                        $lte: new Date()
                    }
                };

                // Making another query to display events older than current date
                collection.find(findSelector).toArray(function(err, currentEvents) {
                    if (err) {
                        err.type = 'db:city-events:current';
                        return next(err);
                    }

                    // quite a hack to avoid using changed req.params.city
                    var cityName = docs[0].city;

                    res.render('city-events', {
                        title: 'Архів подій у місті ' + cityName,
                        city: cityName,
                        events: currentEvents,
                        env: app.get('env'),
                        originalUrl: req.originalUrl,
                        isArchive: true,
                        noArchiveUrl: '/' + req.params.city
                    });
                });

            } else {
                // It is not a city from db
                next();
            }
        });
    });

    return router;

}

// TODO: sort events by date
// TODO: refacor into separate file?
