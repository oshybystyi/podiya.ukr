
var eventModel = require('../models/Event'),
    helper = require('../components/Helper'),
    ObjectID = require('mongodb').ObjectID,
    moment = require('moment');

// TODO (possible): move handler into models/Event.js as find method, priority:
// low

// TODO: add something, hm

/**
 * Controller for events routes
 */
function Event() {}

Event.prototype = {
    addAction: function(req, res) {
        return res.render('admin/add-event', {title: 'Додати подію', ev: {}, noGag: true, moment: moment});
    },

    insertAction: function(req, res, next) {
        try {
            eventModel.insert(req, function(newDoc) {
                return function(err) {
                    if (err) {
                        err.type = 'db:event-insert';
                        return next(err);
                    }

                    return res.redirect(helper.encodeUrl('/' + helper.toUrl(newDoc.city)));
                };
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
                eventModel.update(req, doc, function(newDoc) {
                    return function(err) {
                        if (err) {
                            err.type = 'db:update-error';
                            return next(err);
                        }

                        // TODO: refactoring - need to create some better route
                        // generation, priority: low
                        if (doc.date >= new Date()) {
                            return res.redirect(helper.encodeUrl('/' + helper.toUrl(newDoc.city)));
                        } else {
                            return res.redirect(helper.encodeUrl('/' + helper.toUrl(newDoc.city) + '/архів'));
                        }
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
            var eventID = new ObjectID(req.params.eventID)
        } catch (e) {
            // means id is not correct -> 404
            return next();
        }

        req.db.collection('events').findOne({_id: eventID}, {}, function(err, doc) {
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
    }
};

module.exports = new Event();
