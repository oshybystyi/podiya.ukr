
var Ev = require('../models/Event'),
    ObjectId = require('mongoose').Types.ObjectId,
    helper = require('../components/Helper'),
    moment = require('moment');

// TODO (possible): move handler into models/Event.js as find method, priority:
// low
// TODO: make promise in the handler, so render won't be a callback

/**
 * Controller for events routes
 */
function Event() {}

Event.prototype = {
    viewAction: function(req, res, next, app) {

        Ev.findOne({_encodedUrl: req.originalUrl.toLowerCase()}, function(err, doc) {
            if (err) {
                err.type = 'db:event-search';
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

    },

    addAction: function(req, res) {
        return res.render('admin/add-event', {title: 'Додати подію', ev: {}, noGag: true, moment: moment});
    },

    insertAction: function(req, res, next) {
        try {
            var ev = new Ev(this.eventFromReq(req));
            ev.save(function(err) {
                if (err) {
                    err.type = 'db:event-insert';
                    return next(err);
                }

                return res.redirect(helper.encodeUrl('/' + helper.toUrl(ev.city)));
            });
        } catch (e) {
            e.type = 'db.error-during-insert';
            return next(e);
        }
    },

    editAction: function(req, res, next) {
        this.handler(req, res, next, function(doc) {
            return res.render('admin/edit-event', {title: 'Редагувати подію', ev: doc, noGag: true, moment: moment});
        });
    },

    updateAction: function(req, res, next) {
        try {
            this.handler(req, res, next, function(doc) {
                var doc = helper.merge(doc, this.eventFromReq(req));

                doc.save(function(err) {
                    if (err) {
                        err.type = 'db:update-error';
                        return next(err);
                    }

                    // TODO: refactoring - need to create some better route
                    // generation, priority: low
                    if (doc.date >= new Date()) {
                        return res.redirect(helper.encodeUrl('/' + helper.toUrl(doc.city)));
                    } else {
                        return res.redirect(helper.encodeUrl('/' + helper.toUrl(doc.city) + '/архів'));
                    }
                });
            });
        } catch (e) {
            e.type = 'db:error-during-update';
            return next(e);
        }
    },

    handler: function(req, res, next, callback) {
        try {
            // Checking if it is valid object id to avoid unnecessary db query
            // on every request
            var eventID = new ObjectId(req.params.eventID)
        } catch (e) {
            // means id is not correct -> 404
            return next();
        }

        Ev.findOne({_id: eventID}, function(err, doc) {
            if (err) {
                err.type = 'db:edit-event-lookup';
                return next(err);
            }

            if (doc) {
                // we found doc
                return callback(doc);
            } else {
                return next();
            }
        });
    },

    /** Extract event object ready to be used for event model **/
    eventFromReq: function(req) {
        if (req.body.setTimeLater) {
            var setTimeLater = true,
                date = new Date(req.body.date);
        } else {
            var setTimeLater = false,
                date = new Date(req.body.date + ' ' + req.body.time);
        }

        var image = '';
        if (req.files.image) {
            image = '/uploads/event-images/' + req.files.image.name;
        }

        return {
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            address: req.body.address,
            setTimeLater: setTimeLater,
            date: date,
            tags: req.body.tags,
            source: req.body.source,
            image: image
        };
    }
};

module.exports = new Event();
