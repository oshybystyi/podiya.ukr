var usersRouter = require('express').Router();

/* GET users listing. */
usersRouter.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = usersRouter;
