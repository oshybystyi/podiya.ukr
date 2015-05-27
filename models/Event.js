
var helper = require('../components/Helper');

/**
 * Event model
 * TODO:
 *  validation:
 *      date - not empty and proper
 *      time - not empty and proper
 *      name can't be archive
 */

function Event() {}

Event.prototype.add = function(req) {
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

    var tags = req.body.tags.split(/\s*,\s*/),
        name = req.body.name,
        city = req.body.city;

    // Generating url
    var slug = helper.toUrl(req.body.name);

    var city = helper.toUrl(req.body.city);

    var url = '/' + city + '/' + slug;

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
        _encodedUrl: helper.encodeUrl(url)
    });
}

module.exports = new Event();
