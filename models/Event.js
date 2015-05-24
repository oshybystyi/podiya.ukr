
/**
 * Event model
 * TODO:
 *  validation:
 *      date - not empty and proper
 *      time - not empty and proper
 */

function Event() {}

Event.prototype.add = function(req) {
    var collection = req.db.collection('events');

    if (req.body.setTimeLater) {
        var setTimeLater = true,
            date = new Date(req.body.date);
    } else {
        var setTimeLater = false,
            date = new Date(req.body.date + ' ' + req.body.time);
    }

    var tags = req.body.tags.split(/\s*,\s*/);

    collection.insert({
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        address: req.body.address,
        setTimeLater: setTimeLater,
        date: date,
        tags: tags,
        source: req.body.source
    });
}

module.exports = new Event();
