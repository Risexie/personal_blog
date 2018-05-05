var express = require('express');
var router = express.Router();
var marked = require('marked');
var PostModel = require('./models/post');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home page'
  });
});

/* GET create page. */
router.get('/posts/create', function (req, res, next) {
  res.render('create', {
    title: 'create'
  });
});

/* GET post listing*/
router.get('/posts', function (req, res, next) {
  res.render('posts', {
    title: "post"
  });
});

/* GET show content*/
router.get('/posts/show', function (req, res, next) {
  var id = req.query.id;

  PostModel.findById(id, function (err, show) {
    if (err) {
      console.log(err)
    }
    show.content = marked(show.content)
    res.render('show', {
      show
    })
  });
});
module.exports = router;