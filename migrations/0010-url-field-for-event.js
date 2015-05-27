
var mongodb = require('mongodb'),
    helper = require('../components/Helper');

exports.up = function(db, next){
    var collection = db.collection('events');

    collection.find().toArray(function(err, docs) {
        if (err) {
            console.error('Opps error during migration');
            console.error(err);
        }

        docs.forEach(function(doc) {
            var slug = helper.toUrl(doc.name);

            var city = helper.toUrl(doc.city);

            var url = '/' + city + '/' + slug,
                encodedUrl = helper.encodeUrl(url);

            collection.update({_id: doc._id}, {$set: {url: url, _encodedUrl: encodedUrl}});
        });

        next();
    });
};

exports.down = function(db, next){
    db.collection('events').update({}, {$unset: {url: '', _encodedUrl: ''}}, {multi: true}, function(err, docs) {
        next();
    });
};
