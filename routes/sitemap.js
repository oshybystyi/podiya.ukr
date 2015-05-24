
var router = require('express').Router();

router.get('^/sitemap.xml$', function(req, res, next) {
    var urls = [],
        domain = 'http://xn--d1atc0e8a.xn--j1amh';
    
    // index
    urls.push({
        loc: domain + '/',
        changefreq: 'monthly'
    });

    // links per town
    req.db.collection('events').distinct('city', function(err, docs) {
        if (err) {
            err.type = 'db';
            next(err);
        } else {
            docs.forEach(function(doc) {
                urls.push({
                    loc: domain + '/' + encodeURIComponent(doc),
                    changefreq: 'daily'
                });
            });

            res.set('Content-Type', 'application/xml');
            res.render('sitemap', {urls: urls});
        }
    });
});

module.exports = router;
