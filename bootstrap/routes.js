
module.exports = function(app) {
    var indexRouter = require('../routes/index')(app);
    var adminRouter = require('../routes/admin');
    var loginRouter = require('../routes/login')(app);

    app.use(indexRouter);
    app.use(adminRouter);
    app.use(loginRouter);
}
