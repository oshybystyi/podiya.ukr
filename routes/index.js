var indexRouter = require('express').Router();

module.exports = function(app) {
  /* GET home page. */
  indexRouter.get('/', function(req, res, next) {
    req.db.collection('events').distinct('city', function(err, docs) {
      if (err) {
        next(err);
      } else {
        // TODO: think of a proper redirect according to current location
        // e.g. use cookies if user want to other cities

        res.render('index', {
          title: 'Подія.укр',
          env: app.get('env'),
          cities: docs.sort(),
          authorized: (req.session && req.session.user)
        });
      }
    });
  });

  return indexRouter;
}
