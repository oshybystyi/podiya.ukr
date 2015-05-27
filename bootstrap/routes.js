
module.exports = function(app) {
    var indexRouter = require('../routes/index')(app);
    var citiesRouter = require('../routes/city-events')(app);
    var adminRouter = require('../routes/admin');
    var loginRouter = require('../routes/login')(app);
    var sitemapRouter = require('../routes/sitemap');
    var eventPageRouter = require('../routes/event-page')(app);

    app.use(indexRouter);
    app.use(citiesRouter);
    app.use(adminRouter);
    app.use(loginRouter);
    app.use(sitemapRouter);
    app.use(eventPageRouter);
}
