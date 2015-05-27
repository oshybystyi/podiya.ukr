
/**
 * Controller for city events routes
 */
function CityEvents() {}

CityEvents.prototype = {
    
    upcommingEvents: function(req, res, next, app) {

        this.handler(req, res, next, false, function(cityName, currentEvents) {
            return res.render('city-events', {
                title: 'Події у місті ' + cityName + ' (Афіша)',
                city: cityName,
                events: currentEvents,
                env: app.get('env'),
                originalUrl: req.originalUrl,
                isArchive: false
            });
        });

    },

    // Old events or 'archived events'
    oldEvents: function(req, res, next, app) {

        this.handler(req, res, next, true, function(cityName, currentEvents) {
            return res.render('city-events', {
                title: 'Архів подій у місті ' + cityName,
                city: cityName,
                events: currentEvents,
                env: app.get('env'),
                originalUrl: req.originalUrl,
                isArchive: true,
                noArchiveUrl: '/' + req.params.city
            });
        });

    },

    handler: function(req, res, next, isArchive, renderCallback) {
        var city = req.params.city.replace('-', ' ');
        var cityReg = new RegExp('^' + city + '$', 'i');
        var collection = req.db.collection('events');

        collection.find({city: cityReg}).toArray(function(err, docs) {
            if (err) {
                err.type = 'db:city-events:all';
                return next(err);
            } else if (docs.length > 0) {
                // There are events for this city - so not a 404
                var findSelector = {
                    city: cityReg
                };

                if (!isArchive) {
                    findSelector.date = {$gte: new Date()};
                } else {
                    findSelector.date = {$lte: new Date()};
                }

                collection.find(findSelector).toArray(function(err, currentEvents) {
                    if (err) {
                        if (isArchive) {
                            err.type = 'db:city-events:current';
                        } else {
                            err.type = 'db:city-events:archive';
                        }

                        return next(err);
                    }

                    // quite a hack to avoid using changed req.params.city
                    var cityName = docs[0].city;

                    return renderCallback(cityName, currentEvents);
                });

            } else {
                // It is not a city from db
                return next();
            }
        });
    }

}

module.exports = new CityEvents();
