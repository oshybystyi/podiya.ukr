
var router = require('express').Router(),
    helper = require('../../components/Helper');

/** Admin homepage **/
router.get('^' + helper.encodeUrl('/адмінка') + '$', function(req, res) {
    res.render('admin/home', {title: 'Адмінка', noGag: true});
});

module.exports = router;
