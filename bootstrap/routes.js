
var indexRouter = require('../routes/index');
var adminRouter = require('../routes/admin');
var loginRouter = require('../routes/login');

module.exports = function(app) {
    app.use(indexRouter);
    app.use(adminRouter);
    app.use(loginRouter);
}
