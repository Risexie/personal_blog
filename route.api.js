var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');

  /* GET users listing. */
  router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
  });

/* Get lists data*/ 
router.get('/list',function(req, res, next){
  PostModel.find({},{},function(err,posts){
    if(err){
      res.json({success:true});
      return
    }
    res.json({ success: true, postsList: posts });
  })
  
});
router.post('/list/create',function(req, res, next){
  var title = req.body.title;
  var content = req.body.content;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.save(function(err,doc){
    res.json({ success:true})
  })
});

module.exports = router;
