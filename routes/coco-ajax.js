var express = require('express');
var router = express.Router();
var blog = require('../coco_core/blog-impl');

router.post('/save_blog', function(req, res) {
    blog.saveBlog(req,res);
});

router.get('/get_blog_list', function(req, res) {
    blog.getBlogList(req,res);
});

router.get('/get_friend_list', function(req, res) {
    blog.getBlogList(req,res);
});

router.get('/get_topic_list', function(req, res) {
    blog.getBlogList(req,res);
});



module.exports = router;
