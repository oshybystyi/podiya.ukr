var indexRouter = require('express').Router();

module.exports = function(app) {
  /* GET home page. */
  indexRouter.get('/', function(req, res, next) {
    req.db.collection('events').distinct('city', function(err, docs) {
      res.render('index', {
        title: 'Подія.укр',
        env: app.get('env'),
        cities: docs.sort()
      });
    });
  });

  return indexRouter;
}
