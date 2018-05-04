var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

/* GET create listing. */
router.get('/create', function(req, res, next) {
  res.render('create', { title : 'create' });
});

/* GET view listing. */
router.get('/view', function(req, res, next) {
    res.render('view', { title : 'view' });
  });
  /* GET users listing. */
router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
  });
  
module.exports = router;
