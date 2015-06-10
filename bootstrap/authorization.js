
/**
 * Protect secured areas with password
 */

var helper = require('../components/Helper'),
    adminAuth = require('../components/AdminAuth');

module.exports = function(app) {
    app.use('^' + helper.encodeUrl('/адмінка'), function(req, res, next) {
        adminAuth(req, res, next);
    });
}
