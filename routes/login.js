
var loginRouter = require('express').Router(),
    loginCtrl = require('../controllers/Login'),
    uri = '/' + encodeURIComponent('логін');

loginRouter.get(uri, function(req, res) {
    res.render('login', {title: 'Нігол'});
});

loginRouter.post(uri, function(req, res) {
    loginCtrl.loginAndRedirectAction(req, res);
});

module.exports = loginRouter;
