var indexRouter = require('express').Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Подія' });
});

module.exports = indexRouter;
