
var router = require('express').Router();

module.exports = function(app) {

    router.use('^/:city$', function(req, res, next) {
        var city = req.params.city.replace('-', ' ');

        var cityReg = new RegExp('^' + city + '$', 'i');

        req.db.collection('events').find({city: cityReg}).toArray(function(err, docs) {
            if (err) {
                next(err);
            } else if (docs.length > 0) {
                // quite a hack to avoid using changed req.params.city
                var cityName = docs[0].city;

                res.render('city-events', {
                    title: 'Події у місті ' + cityName,
                    city: cityName,
                    events: docs,
                    env: app.get('env')
                });
            } else {
                // It is not a city from db
                next();
            }
        });
    });

    return router;

}
