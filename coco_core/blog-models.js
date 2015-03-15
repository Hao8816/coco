var orm = require("orm");
var settings = require('../config/db-config');
var db = orm.connect(settings.mysql,function(err,db){
    if (err){
        console.log(err)
        console.log('Can not connect to mysql!');
    }else{
        console.log("Connect sucessfully!");
    }
});

var blog_models = {};


// 用户信息表
var Blog = db.define("blog", {
    time          : String,    // 微博创建的时间
    sha1          : String,    // blog的sha1
    title         : String,    // 博客标题
    content       : String,    // 博客的内容
    images        : Object,    // 博客的图片信息: Object,
    creator_sha1  : String,    // 博客的创建者信息
    topic_sha1    : String     // 博客的所属的主题

}, {
    // with in model method
});

// 用户信息表
var Topic = db.define("topic", {
    time          : String,    // 微博创建的时间
    sha1          : String,    // blog的sha1
    title         : String,    // 主题标题
    desc          : String,    // 主题的描述
    images        : Object,    // 博客的图片信息: Object,
    creator_sha1  : String,    // 创建者信息
    related       : Object     // 和主题相关的主题

}, {
    // with in model method
});


db.sync();

blog_models['Blog'] = Blog;
blog_models['Topic'] = Topic;

module.exports = blog_models;
