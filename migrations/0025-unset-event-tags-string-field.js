
var mongodb = require('mongodb');

exports.up = function(db, next){
    var collection = db.collection('events');

    collection.find({tags: ''}).toArray(function(err, docs) {
        if (err) {
            throw err;
        }

        docs.forEach(function(doc) {
            collection.update({_id: doc._id}, {$unset: {tags: ''}});
        });

        next();
    });
};

exports.down = function(db, next){
    // Nothing
    next();
};
