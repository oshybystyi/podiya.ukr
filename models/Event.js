
var helper = require('../components/Helper'),
    fs = require('fs');

/**
 * Event model
 * TODO:
 *  validation:
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
    add: function(req) {
        if (typeof req.body.name === 'undefined') {
            // TODO: move this into validation
            throw new Error('Name is empty and that is not good');
        }

        if (req.body.name === 'Архів') {
            // TODO: move that into validation
            throw new Error('Event can not be called \'Архів\' - it is reserved word');
        }

        var collection = req.db.collection('events');

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

        collection.insert({
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
        });
    }
};

module.exports = new Event();
