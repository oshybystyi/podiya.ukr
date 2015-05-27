
/**
 * Contains various helper functions
 */
function Helper() {}

Helper.prototype = {
    toUrl: function(str) {
        return str.toLowerCase()
            .replace(/[\-,.\s\/\'\"]+/g, '-')
            .replace(/-$/, '')
            .replace(/^-/, '');
    },

    encodeUrl: function(str) {
        var parts = str.split('/');
        
        var encodedParts = [];

        parts.forEach(function(elem) {
            encodedParts.push(encodeURIComponent(elem));
        });

        return encodedParts.join('/').toLowerCase();
    }
}

module.exports = new Helper();
