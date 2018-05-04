var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/* GET create listing. */
router.get('/create', function (req, res, next) {
  res.render('create', {
    title: 'create'
  });
});

/* GET post content*/
router.get('/show',function(req,res,next){
var id = req.query.id;

PostModel.findById(id,function(err,show){
  if(err){
    console.log(err)
  }
  res.render('show',{show})
});
});
module.exports = router;