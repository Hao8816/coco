var blog_models = require('../coco_core/blog-models');
var SHA1 = require('sha1');

var parent_sha1 = "";
var images = [];
var blog_sha1 = "896377eb283302b5a9415bfef90f7eaec308c48b";
var creator_sha1 = "d44af656b5aa0db14b91a7557744e3cf9d67f8fd";
var content = "this is areply test";
var date_time = new Date().getTime();
var sha1 = SHA1(date_time+blog_sha1);
blog_models.Comment.create([{
    time          : date_time.toString(),    // 微博创建的时间
    sha1          : sha1,                    // blog的sha1
    content       : content,                 // 博客的内容
    images        : images,                  // 博客的图片信息: Object,
    creator_sha1  : creator_sha1,            // 博客的创建者信息
    blog_sha1     : blog_sha1,               // 博客的所属的主题
    parent_sha1   : parent_sha1              // 博客的父节点的sha1

}],function (err,item){
    console.log(err);
    console.log(item);
});