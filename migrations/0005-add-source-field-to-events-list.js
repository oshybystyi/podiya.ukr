
var mongodb = require('mongodb');

exports.up = function(db, next){
    db.collection('events').update({}, {$set: {source: ''}}, {multi: true}, next);
};

exports.down = function(db, next){
    db.collection('events').update({}, {$unset: {source: ''}}, {multi: true}, next);
};
