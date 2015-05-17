
module.exports = function(app) {
    var indexRouter = require('../routes/index')(app);
    var citiesRouter = require('../routes/cities')(app);
    var adminRouter = require('../routes/admin');
    var loginRouter = require('../routes/login')(app);

    app.use(indexRouter);
    app.use(citiesRouter);
    app.use(adminRouter);
    app.use(loginRouter);
}
