
var router = require('express').Router(),
    cityEventsCtrl = require('../controllers/CityEvents');

module.exports = function(app) {

    router.get('^/:city$', function(req, res, next) {
        cityEventsCtrl.upcommingEventsAction(req, res, next, app);
    });

    router.get('^/:city/' + encodeURIComponent('архів') + '$', function(req, res, next) {
        cityEventsCtrl.oldEventsAction(req, res, next, app);
    });

    return router;

}
