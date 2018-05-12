var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var bcrypt = require('bcrypt');
var UserModel = require('./models/user');
var config = require('./config');


/* Get lists data*/
router.get('/posts', function (req, res, next) {
  PostModel.find({}, {}, function (err, posts) {
    if (err) {
      next(err);
    } else {
      res.json({
        success: true,
        postsList: posts
      });
    }
  })

});
/* POST create post */
router.post('/posts', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  
  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.authorId = res.locals.currentUser._id;
  post.save(function(err, doc) {
    if (err) {
      next(err);
    } else {
      res.json({ post: doc });
    }
  });
});

router.get('/posts/:id', function (req, res, next) {
  var id = req.params.id;

  PostModel.findById(id, function (err, show) {
    if (err) {
      next(err);
    } else {
      res.json({
        success: trueç,
        show
      });
    }
  });
});

router.patch('/posts/:id', function (req, res, next) {
  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({
    _id: id
  }, {
    title,
    content
  }, function (err) {
    if (err) {
      next(err);
    } else {
      res.json({});
    }
  });
});

router.delete('/posts/:id', function (req, res, next) {
  var id = req.params.id;

  PostModel.findByIdAndRemove(id, function (err, ) {
    if (err) {
      next(err);
    } else {
      res.json({});
    }
  });
});

/* POST signup user */
router.post('/signup', function(req, res, next) {
  var name = req.body.name;
  var pass = req.body.pass;
  var rePass = req.body.rePass;

  if (pass !== rePass) {
    return next(new Error('两次密码不对'));
  }

  var user = new UserModel();
  user.name = name;
  user.pass = bcrypt.hashSync(pass, 10);
  user.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.end();
    }
  });
});

/* POST signin user */
router.post('/signin', function(req, res, next) {
  var name = req.body.name || '';
  var pass = req.body.pass || '';

  UserModel.findOne({ name }, function(err, user) {
    if (err || !user) {
      return next(new Error('找不到用户'));
    } else {
      var isOk = bcrypt.compareSync(pass, user.pass);
      if (!isOk) {
        return next(new Error('密码不对'));
      }

      var authToken = user._id;
      var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // cookie 有效期30天
        signed: true,
        httpOnly: true
      };

      res.cookie(config.cookieName, authToken, opts);
      res.end();
    }
  });
});

  
  
module.exports = router;