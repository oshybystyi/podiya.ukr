
module.exports = function(app) {
    var indexRouter = require('../routes/index')(app);
    var citiesRouter = require('../routes/cities')(app);
    var adminRouter = require('../routes/admin');
    var loginRouter = require('../routes/login')(app);
    var sitemapRouter = require('../routes/sitemap');

    app.use(indexRouter);
    app.use(citiesRouter);
    app.use(adminRouter);
    app.use(loginRouter);
    app.use(sitemapRouter);
}
