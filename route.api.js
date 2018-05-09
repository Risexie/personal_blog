var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');

/* Get lists data*/ 
router.get('/posts',function(req, res, next){
  PostModel.find({},{},function(err,posts){
    if(err){
      next(err);
    }else{
    res.json({ success:true, postsList: posts });
    }
  })
  
});
router.post('/posts',function(req, res, next){
  var title = req.body.title;
  var content = req.body.content;

  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.save(function(err,doc){
    if(err){
      next(err);
    }else{
      res.json({post: doc});
    }
  })
});

router.get('/posts/:id',function(req,res,next){
var id = req.params.id;

PostModel.findById(id,function(err,show){
  if(err){
    next(err);
  }else{
  res.json({success:true,show});
  }
 });
});

router.patch('/posts/:id',function(req,res,next){
var id = req.params.id;
var title = req.body.title;
var content = req.body.content;

PostModel.findOneAndUpdate({_id:id},{title,content},function(err){
  if(err){
    next(err);
  }else{
    res.json({});
  }
 });
});

router.delete('/posts/:id',function(req,res,next){
var id = req.params.id;

PostModel.findByIdAndRemove(id,function(err,){
  if(err){
    next(err);
  }else{
    res.json({});
  }
 });
});
module.exports = router;
