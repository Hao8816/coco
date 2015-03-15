var blog_models = require('./blog-models');
var SHA1 = require('sha1');

var blog={};
var saveBlog = function saveBlog(req,res){

    var date_time = new Date().getTime();
    var sha1 = SHA1(date_time);
    console.log(req.param)
    var blog_title = req.param('title');
    var blog_content = req.param('content');
    blog_models.Blog.create([{
        time          : date_time,    // 微博创建的时间
        sha1          : sha1,    // blog的sha1
        title         : blog_title,    // 博客标题
        content       : blog_content,    // 博客的描述
        images        : [],    // 博客的图片信息: Object,
        creator_sha1  : '12345'   // 博客的创建者信息
    }],function (err,item){
        console.log(err);
    });
    res.send({'info':"OK","ret":0001})
    console.log(req)
};

var getBlogList = function getBlogList(req,res){
    blog_models.Blog.all([ "time", "Z" ],function(err,result){
        if(err){
            console.log(err);
        }
        console.log(result[0].content);
        res.send({'info':"OK","ret":0001,"blog_list":result})
    })
};

blog.saveBlog = saveBlog;
blog.getBlogList = getBlogList;

module.exports = blog


