
var router = require('express').Router(),
    helper = require('../../components/Helper'),
    addEventURI = '^' + helper.encodeUrl('/адмінка/додати-подію') + '$',
    editEventURI = '^' + helper.encodeUrl('/адмінка/редагувати-подію/') + ':eventID$',
    eventCtrl = require('../../controllers/Event');

/** Add event **/
router.get(addEventURI, function(req, res) {
    eventCtrl.addAction(req, res);
});

router.post(addEventURI, function(req, res, next) {
    eventCtrl.insertAction(req, res, next);
});

/** Edit event **/
router.get(editEventURI, function(req, res, next) {
    eventCtrl.editAction(req, res, next);
});

router.post(editEventURI, function(req, res, next) {
    eventCtrl.updateAction(req, res, next);
});

module.exports = router;
