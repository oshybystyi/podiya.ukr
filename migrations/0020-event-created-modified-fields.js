
var mongodb = require('mongodb');

exports.up = function(db, next){
    // I've chosen random 2015-05-05 date
    db.collection('events').update({}, {$set: {created: new Date('2015-05-05'), modified: new Date('2015-05-05')}}, {multi: true}, next);
};

exports.down = function(db, next){
    db.collection('events').update({}, {$unset: {created: '', modified: ''}}, {multi: true}, next);
};
