var indexRouter = require('express').Router();

module.exports = function(app) {
  /* GET home page. */
  indexRouter.get('/', function(req, res, next) {
    res.render('index', { title: 'Подія', env: app.get('env') });
  });

  return indexRouter;
}
