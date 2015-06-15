
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: String,
    password: String
},
{
    strict: 'throw'
}
);

module.exports = mongoose.model('User', schema);
