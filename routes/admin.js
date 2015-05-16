
var adminRouter = require('express').Router(),
    adminAuth = require('../components/AdminAuth'),
    eventModel = require('../models/Event'),
    addEventURI = '^/' + encodeURIComponent('адмінка') + '/' + encodeURIComponent('додати-подію') + '$';

/** Authorization for all admin routes **/
adminRouter.use('^/' + encodeURIComponent('адмінка'), function(req, res, next) {
    adminAuth(req, res, next);
});

/** Admin homepage **/
adminRouter.use('^/' + encodeURIComponent('адмінка') + '$', function(req, res) {
    res.render('admin/home', {title: 'Адмінка'});
});

/** Add event **/
adminRouter.get(addEventURI, function(req, res) {
    res.render('admin/add-event', {title: 'Додати подію'});
});

adminRouter.post(addEventURI, function(req, res) {
    // TODO: form validation

    eventModel.add(req);

    res.redirect('/');
});

module.exports = adminRouter;
