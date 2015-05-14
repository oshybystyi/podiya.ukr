
/**
 * Check whether user is authorized
 */
function AdminAuth(req, res, next) {
    if (
        req.session &&
        req.session.user === 'admin1'
    ) {
        next();
    } else { 
        req.session.prevUrl = req.originalUrl;
        req.session.save();

        res.redirect('/' + encodeURIComponent('логін'));
    }
}

module.exports = AdminAuth;
