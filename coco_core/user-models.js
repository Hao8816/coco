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

var user_models = {};


// 用户信息表
var User = db.define("user", {
    time          : String,    // 用户注册的创建的时间
    sha1          : String,    // 用户的sha1
    name          : String,    // 用户名
    password      : String,    // 密码
    first_name    : String,    // 姓
    last_name     : String,    // 名,
    head_image    : String,    // 用户的图像
    email         : String,    // email地址
    phone         : String,    // 电话
    location      : String,    // 位置
    nb_friend     : Number,    // 好友的数量
    nb_blog       : Number,    // 博客的数量
    nb_topic      : Number,    // 主题的数量
    status        : Number     // 用户的账号状态

}, {
    // with in model method
});


// 用户信息表
var Userlocation = db.define("location", {
    time          : String,    // 用户位置更新时间
    user_sha1     : String,    // 用户的sha1
    city          : String,    // 解析出来的地址
    longitude     : String,    // 经度
    latitude      : String     // 纬度
}, {
    // with in model method
});


// 用户的好友关系
var Friendship = db.define("friend",{
    time          : String,    // 用户注册的创建的时间
    sha1          : String,    // sha1
    friend_sha1   : String,    // 我的好友的sha1
    my_sha1       : String,    // 我自己的sha1
    block         : String     // 是否加入黑名单

}, {
    // with in model method
});


// 用户关注那些主题跟topic相关
var Userconcern = db.define("concern",{
    time          : String,    // 用户注册的创建的时间
    sha1          : String,    // sha1
    topic_sha1    : String,    // 我的好友的sha1
    user_sha1     : String,    // 我自己的sha1
    block         : String     // 是否加入黑名单
}, {
    // with in model method
});


db.sync();

user_models['User'] = User;
user_models['Friendship'] = Friendship;
user_models['Userconcern'] = Userconcern;
user_models['Userlocation'] = Userlocation;

module.exports = user_models;
