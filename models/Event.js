
var mongoose = require('mongoose'),
    helper = require('../components/Helper');

var eventSchema = new mongoose.Schema({
    name: {type: String, required: true, match: /^(?!.*Архів).*$/i}, // can't be archive, because it is reserved
    description: String,
    city: {type: String, required: true},
    address: String,
    setTimeLater: {type: Boolean, default: false},
    date: Date,
    tags: [String],
    source: String,
    url: {type: String, required: true},
    _encodedUrl: {type: String, required: true},
    image: String,
    created: {type: Date, default: Date.now},
    modified: Date
},
{
    strict: 'throw'
}
);

eventSchema.pre('validate', function(next) {
    if (this.isNew) {
        this.url = '/' + helper.toUrl(this.city) + '/' + helper.toUrl(this.name);
        this._encodedUrl = helper.encodeUrl(this.url);
    } else {
        if (this.image === '') {
            // On current form when we don't upload the file - we don't need to
            // remove old one
            delete this.image;
        }
    }

    // Creating tags
    if (typeof this.tags === 'string') {
        this.tags = this.tags.split(/\s*,\s*/);
    }

    this.modified = new Date;
    return next();
});

module.exports = mongoose.model('Event', eventSchema);

// TODO: Validate duplicates of url
