
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
    },

    /**
     * Merge two objects
     */
    merge: function(dest, src) {
        for (var prop in src) {
            dest[prop] = src[prop]
        }

        return dest;
    }
}

module.exports = new Helper();
