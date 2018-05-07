var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');

/* Get lists data*/ 
router.get('/posts',function(req, res, next){
  PostModel.find({},{},function(err,posts){
    if(err){
      res.json("返回数据失败");
      return
    }
    res.json({ success:"返回数据成功", postsList: posts });
  })
  
});
router.post('/posts',function(req, res, next){
  var title = req.body.title;
  var content = req.body.content;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.save(function(err,doc){
    res.json("保存成功")
  })
});

router.get('/posts/:id',function(req,res,next){
var id = req.params.id;

PostModel.findById(id,function(err,show){
  if(err){
    res.json({success:false})
    return
  }
  res.json({success:true, show});
 });
});

router.patch('/posts/:id',function(req,res,next){
var id = req.params.id;
var title = req.body.title;
var content = req.body.content;

PostModel.findOneAndUpdate({_id:id},{title,content},function(err){
  if(err){
    res.json({success:false})
  }else{
    res.json({success:true})
  }
 });
});
module.exports = router;
