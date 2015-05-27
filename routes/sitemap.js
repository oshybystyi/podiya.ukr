
var router = require('express').Router(),
    async = require('async');

router.get('^/sitemap.xml$', function(req, res, next) {
    var urls = [],
        domain = 'http://xn--d1atc0e8a.xn--j1amh';
    
    // index
    urls.push({
        loc: domain + '/',
        changefreq: 'monthly'
    });

    async.parallel([
        // links per town
        function(callback) {
            req.db.collection('events').distinct('city', function(err, docs) {
                if (err) {
                    err.type = 'db';
                    callback(err);
                } else {
                    docs.forEach(function(doc) {
                        urls.push({
                            loc: domain + '/' + encodeURIComponent(doc),
                            changefreq: 'daily'
                        });
                    });

                    callback();
                }
            });
        },

        // Events links
        function(callback) {
            req.db.collection('events').find({}).toArray(function(err, docs) {
                if (err) {
                    err.type = 'db';
                    callback(err);
                } else {
                    docs.forEach(function(doc) {
                        urls.push({
                            loc: domain + doc._encodedUrl,
                            changefreq: 'monthly'
                        });
                    });
                    callback();
                }
            });
        }
    ],
        function(err) {
            if (err) {
                return next(err);
            }

            res.set('Content-Type', 'application/xml');
            res.render('sitemap', {urls: urls});
        }
    );

});

module.exports = router;

// TODO: add only newer event page records to sitemap to reduce sitemap size in
// the future
