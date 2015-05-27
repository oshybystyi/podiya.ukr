
var mongodb = require('mongodb'),
    helper = require('../components/Helper');

exports.up = function(db, next){
    var collection = db.collection('events');
    collection.find({}, {}, function(err, docs) {
        if (err) {
            console.error('There was an error in getting documents');
            console.error(err);
        }

        docs.forEach(function(doc) {
            collection.update({_id: doc._id}, {$set: {_encodedUrl: helper.encodeUrl(doc.url)}}, {});
        });

        next();
    });
};

exports.down = function(db, next){
    db.collection('events').update({}, {$unset: {_encodedUrl: ''}}, {multi: true}, next);
};
