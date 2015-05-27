
var adminRouter = require('express').Router(),
    adminAuth = require('../components/AdminAuth'),
    eventModel = require('../models/Event'),
    helper = require('../components/Helper'),
    addEventURI = '^' + helper.encodeUrl('/адмінка/додати-подію') + '$';

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
    res.render('admin/add-event', {title: 'Додати подію', noGag: true});
});

adminRouter.post(addEventURI, function(req, res) {
    // TODO: form validation

    eventModel.add(req);

    res.redirect('/');
});

module.exports = adminRouter;
