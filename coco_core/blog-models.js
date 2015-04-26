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


// 博客信息表
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


// 博客信息表
var BlogAction = db.define("blog_action", {
    time          : String,    // 微博创建的时间
    sha1          : String,    // blog的sha1
    creator_sha1  : String,    // 博客的创建者信息
    action_type   : String     // 0 评论 1分享 2点赞 3点踩
}, {
    // with in model method
});


// 评论信息表
var Comment = db.define("comment", {
    time          : String,    // 微博创建的时间
    sha1          : String,    // blog的sha1
    content       : String,    // 博客的内容
    images        : Object,    // 博客的图片信息: Object,
    creator_sha1  : String,    // 博客的创建者信息
    blog_sha1     : String     // 博客的所属的主题

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
    related       : Object,    // 和主题相关的主题
    update_time   : String     // 主题的最近更新时间

}, {
    // with in model method
});

// 博客信息表
var TopicAction = db.define("topic_action", {
    time          : String,    // 微博创建的时间
    sha1          : String,    // blog的sha1
    creator_sha1  : String,    // 博客的创建者信息
    action_type   : String     // 0 查看 1 参与 2分享
}, {
    // with in model method
});


// 文件信息表
var File = db.define("file",{
    time          : String,    // 微博创建的时间
    sha1          : String,    // blog的sha1
    name          : String,    // 文件名称
    size          : String,    // 文件的大小
    type          : String,    // 文件类型
    path          : String,    // 文件的存储路径
    creator_sha1  : String,    // 创建者信息
    blog_sha1     : String     // 文件所属的博客的sha1
},{

    // with in model method
});


db.sync();

blog_models['Blog'] = Blog;
blog_models['BlogAction'] = BlogAction;
blog_models['Topic'] = Topic;
blog_models['TopicAction'] = TopicAction;
blog_models['File'] = File;

module.exports = blog_models;
