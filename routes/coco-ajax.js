var express = require('express');
var router = express.Router();
var blog = require('../coco_core/blog-impl');
var user = require('../coco_core/user-impl');

router.post('/save_blog/', function(req, res) {
    blog.saveBlog(req,res);
});

router.post('/save_topic/', function(req, res) {
    blog.saveTopic(req,res);
});

router.post('/get_blog_list/', function(req, res) {
    blog.getBlogList(req,res);
});

router.get('/get_friend_list/', function(req, res) {
    blog.getBlogList(req,res);
});

router.post('/get_topic_list/', function(req, res) {
    console.log(req.param('creator_sha1'))
    blog.getTopicList(req,res);
});


router.post('/register/',function(req,res){
    user.createUser(req,res);
});

router.post('/login/',function(req,res){
    user.loginUser(req,res);
})



module.exports = router;
