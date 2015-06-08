
var adminRouter = require('express').Router(),
    adminAuth = require('../components/AdminAuth'),
    eventModel = require('../models/Event'),
    helper = require('../components/Helper'),
    addEventURI = '^' + helper.encodeUrl('/адмінка/додати-подію') + '$',
    editEventURI = '^' + helper.encodeUrl('/адмінка/редагувати-подію/') + ':eventID$',
    eventCtrl = require('../controllers/Event');

/** Authorization for all admin routes **/
adminRouter.use('^' + helper.encodeUrl('/адмінка'), function(req, res, next) {
    adminAuth(req, res, next);
});

/** Admin homepage **/
adminRouter.get('^' + helper.encodeUrl('/адмінка') + '$', function(req, res) {
    res.render('admin/home', {title: 'Адмінка', noGag: true});
});

/** Add event **/
adminRouter.get(addEventURI, function(req, res) {
    eventCtrl.addAction(req, res);
});

adminRouter.post(addEventURI, function(req, res, next) {
    eventCtrl.insertAction(req, res, next);
});

/** Edit event **/
adminRouter.get(editEventURI, function(req, res, next) {
    eventCtrl.editAction(req, res, next);
});

adminRouter.post(editEventURI, function(req, res, next) {
    eventCtrl.updateAction(req, res, next);
});

module.exports = adminRouter;

// TODO: move event routes into separate route file under 'authorized' folder
