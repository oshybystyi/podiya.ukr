
var helper = require('../components/Helper'),
    moment = require('moment');

/**
 * Controller for city events routes
 */
function CityEvents() {}

CityEvents.prototype = {
    
    upcommingEventsAction: function(req, res, next, app) {

        this.handler(req, res, next, false, app, function(commonProps) {
            return res.render('city-events', helper.merge(commonProps, {
                title: 'Події у місті ' + commonProps.city + ' (Афіша)'
            }));
        });

    },

    // Old events or 'archived events'
    oldEventsAction: function(req, res, next, app) {

        this.handler(req, res, next, true, app, function(commonProps) {
            return res.render('city-events', helper.merge(commonProps, {
                title: 'Архів подій у місті ' + commonProps.city,
                noArchiveUrl: '/' + req.params.city
            }));
        });

    },

    handler: function(req, res, next, isArchive, app, renderCallback) {
        self = this;

        if (helper.toUrl(req.params.city) !== req.params.city) {
            // check so that /City-name will throw 404
            return next();
        }

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
                    var sort = {date: 1};
                } else {
                    findSelector.date = {$lte: new Date()};
                    var sort = {date: -1};
                }

                collection.find(findSelector).sort(sort).toArray(function(err, currentEvents) {
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

                    // Render properties that are common for archived and new
                    // events
                    var commonRenderProps = {
                        city: cityName,
                        events: currentEvents,
                        env: app.get('env'),
                        originalUrl: req.originalUrl,
                        isArchive: isArchive,
                        editEvUrlPrefix: '/адмінка/редагувати-подію/',
                        authorized: (req.session && req.session.user === 'admin1'),
                        moment: moment,
                        shortenDescription: self.shortenDescription
                    };

                    return renderCallback(commonRenderProps);
                });

            } else {
                // It is not a city from db
                return next();
            }
        });
    },

    /**
     * Shorten description to be displayed on city events page
     */
    shortenDescription: function(description) {
        var parts = description.split(/\r?\n/);

        var shortText = parts.slice(0, Math.ceil(parts.length * 0.3)).join("\n");

        return shortText;
    }

}

module.exports = new CityEvents();
