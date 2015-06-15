
var User = require('../models/User');

/**
 * Login controller
 */
function Login() {}

Login.prototype.loginAndRedirectAction = function(req, res) {
    var user = req.body.user,
        password = req.body.password;

    if (user && password) {
        User.findOne({user: user, password: password}, function(err, doc) {
            if (err) {
                err.type = 'db:login';

                return next(err);
            }

            if (doc) {
                req.session.user = user;
                req.session.save();

                if (typeof req.session.prevUrl !== 'undefined') {
                    var dest = req.session.prevUrl;
                } else {
                    var dest = '/';
                }

                res.redirect(dest);
            } else {
                res.redirect(''); // redirect to self
            }
        });
    } else {
        res.redirect(''); // redirect to self
    }
};

module.exports = new Login();
