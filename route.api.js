var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');

/* Get lists data*/ 
router.get('/posts/list',function(req, res, next){
  PostModel.find({},{},function(err,posts){
    if(err){
      res.json("返回数据失败");
      return
    }
    res.json({ success:"返回数据成功", postsList: posts });
  })
  
});
router.post('/post/create',function(req, res, next){
  var title = req.body.title;
  var content = req.body.content;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.save(function(err,doc){
    res.json("保存成功")
  })
});

module.exports = router;
