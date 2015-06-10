
/**
 * Login and redirect controller
 * @TODO: need to figure out global configs not use user admin
 */
function Login() {}

Login.prototype.loginAndRedirectAction = function(req, res) {
    var user = req.body.user,
        password = req.body.password;

    if (user && password) {
        req.db.collection('users').findOne({user: user, password: password}, {}, function(err, doc) {
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
