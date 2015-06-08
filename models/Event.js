
var helper = require('../components/Helper'),
    ObjectID = require('mongodb').ObjectID;

/**
 * Event model
 * TODO: validation, priority: middle :
 *      * date - not empty and proper
 *      * time - not empty and proper
 *      * name can't be archive
 *      * file:
 *          * if type is not valid or extension can't be defined - need to throw an
 *            error
 *          * also catch read/write errors
 */

function Event() {}

Event.prototype = {

    _validate: function(req) {
        // TODO: need to be expanded much more

        if (typeof req.body.name === 'undefined') {
            // TODO: move this into validation
            throw new Error('Name is empty and that is not good');
        }

        if (req.body.name === 'Архів') {
            // TODO: move that into validation
            throw new Error('Event can not be called \'Архів\' - it is reserved word');
        }
    },

    _eventFromRequest: function(req) {
        if (req.body.setTimeLater) {
            var setTimeLater = true,
                date = new Date(req.body.date);
        } else {
            var setTimeLater = false,
                date = new Date(req.body.date + ' ' + req.body.time);
        }

        var tags = '';
        if (req.body.tags) {
            tags = req.body.tags.split(/\s*,\s*/);
        }

        var name = req.body.name,
            city = req.body.city;

        // Generating url
        var url = '/' + helper.toUrl(city) + '/' + helper.toUrl(name);

        // Handling image
        var image = '';
        if (req.files.image) {
            image = '/uploads/event-images/' + req.files.image.name;
        }

        return {
            name: name,
            description: req.body.description,
            city: city,
            address: req.body.address,
            setTimeLater: setTimeLater,
            date: date,
            tags: tags,
            source: req.body.source,
            url: url,
            _encodedUrl: helper.encodeUrl(url),
            image: image
        };
    },

    /** Insert new event **/
    insert: function(req, callback) {
        this._validate(req);

        var collection = req.db.collection('events');

        var ev = this._eventFromRequest(req);

        collection.insert(ev, {}, callback(ev));
    },

    /** Update existing event **/
    update: function(req, old, callback) {
        this._validate(req);

        var collection = req.db.collection('events');

        var ev = this._eventFromRequest(req);

        // Don't update url because it might already be in search engines
        delete ev.url;
        delete ev._encodedUrl;

        collection.update({_id: new ObjectID(old._id)}, {$set: ev}, {}, callback(ev));
    }
};

module.exports = new Event();
