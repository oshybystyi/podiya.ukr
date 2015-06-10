
module.exports = function(app) {
    var indexRouter = require('../routes/index')(app);
    var citiesRouter = require('../routes/city-events')(app);
    var loginRouter = require('../routes/login')(app);
    var sitemapRouter = require('../routes/sitemap');
    var eventPageRouter = require('../routes/event-page')(app);

    // Secured
    var adminRouter = require('../routes/secured/admin');
    var eventRouter = require('../routes/secured/event');

    app.use(indexRouter);
    app.use(citiesRouter);
    app.use(loginRouter);
    app.use(sitemapRouter);
    app.use(eventPageRouter);
    app.use(adminRouter);
    app.use(eventRouter);
}
