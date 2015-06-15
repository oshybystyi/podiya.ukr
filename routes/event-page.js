
var router = require('express').Router(),
    eventCtrl = require('../controllers/Event');

module.exports = function(app) {
    router.use(function(req, res, next) {
        eventCtrl.viewAction(req, res, next, app);
    });

    return router;
}
