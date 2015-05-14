
var adminRouter = require('express').Router(),
    adminAuth = require('../components/AdminAuth');

/** Authorization for all admin routes **/
adminRouter.use('^/' + encodeURIComponent('адмінка'), function(req, res, next) {
    adminAuth(req, res, next);
});

/** Admin homepage **/
adminRouter.use('^/' + encodeURIComponent('адмінка') + '$', function(req, res) {
    res.render('admin/home', {title: 'Адмінка'});
});

module.exports = adminRouter;
