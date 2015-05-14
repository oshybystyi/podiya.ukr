
var loginRouter = require('express').Router(),
    loginCtrl = require('../controllers/Login'),
    uri = '/' + encodeURIComponent('логін');

loginRouter.get(uri, function(req, res) {
    if (req.session && req.session.user) {
        res.redirect('/');
    }

    res.render('login', {title: 'Нігол'});
});

loginRouter.post(uri, function(req, res) {
    loginCtrl.loginAndRedirectAction(req, res);
});

module.exports = loginRouter;
