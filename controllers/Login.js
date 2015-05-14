
/**
 * Login and redirect controller
 * @TODO: need to figure out global configs not use user admin
 */
function Login() {}

Login.prototype.loginAndRedirectAction = function(req, res) {
    if (req.body.user === 'admin1' && req.body.password === 'admin2') {
        req.session.user = 'admin1';
        req.session.save();

        if (typeof req.session.prevUrl !== 'undefined') {
            var dest = req.session.prevUrl;
        } else {
            var dest = '/';
        }

        res.redirect(dest);
    } else {
        res.redirect(''); // redirect to self?
    }
};

module.exports = new Login();
