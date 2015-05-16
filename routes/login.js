
var loginRouter = require('express').Router(),
    loginCtrl = require('../controllers/Login'),
    uri = '/' + encodeURIComponent('логін');

module.exports = function(app) {
    loginRouter.get(uri, function(req, res) {
        if (req.session && req.session.user) {
            res.redirect('/');
        }

        res.render('login', {title: 'Нігол', env: app.get('env')});
    });

    loginRouter.post(uri, function(req, res) {
        loginCtrl.loginAndRedirectAction(req, res);
    });

    return loginRouter;
}
