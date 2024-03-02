var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/index', function(req, res, next) {
    res.render('index');
});
router.get('/about', function(req, res, next) {
    res.render('about');
});
router.get('/projects', function(req, res, next) {
    res.render('projects');
});

module.exports = router;