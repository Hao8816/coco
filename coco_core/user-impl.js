var user_models = require('./user-models');
var SHA1 = require('sha1');

var user={};
var createUser = function createUser(req,res){
    var date_time = new Date().getTime();
    var name = req.param('name');
    var sha1 = SHA1(name+date_time);
    var password = req.param('password');
    var phone = req.param('phone');
    var email = req.param('email');

    user_models.User.create([{
        time          : date_time,    // 用户注册的创建的时间
        sha1          : sha1,    // 用户的sha1
        name          : name,    // 用户名
        password      : password,    // 密码
        first_name    : '',    // 姓
        last_name     : '',    // 名,
        head_image    : '',    // 用户的图像
        email         : email,    // email地址
        phone         : phone,    // 电话
        location      : '',    // 位置
        nb_friend     : 0,    // 好友的数量
        nb_blog       : 0,    // 博客的数量
        nb_topic      : 0     // 主题的数量
    }],function (err,item){
        console.log(err);
    });
    res.send({'info':"OK","ret":0001})
    console.log(req)
};


var loginUser = function loginUser(req,res){
    var name = req.param('name')
    var password = req.param('password')
    user_models.User.find({name:name,password:password},function(err,result){
        if(err){
            console.log(err);
            res.send({'info':"ERROR","ret":1001})
            return
        }
        if (result[0]!=null){
            res.send({'info':"OK","ret":0001,"user":result[0]})
        }else{
            res.send({'info':"ERROR","ret":1001})
        }
    })
};



var getUserInfo = function getUserInfo(req,res){
    user_models.User.get({name:'chenhao'},function(err,result){
        if(err){
            console.log(err);
        }
        console.log(result[0].content);
        res.send({'info':"OK","ret":0001,"friend_list":result})
    })
};



var getFriendList = function getFriendList(req,res){
    user_models.Friendship.all([ "name", "Z" ],function(err,result){
        if(err){
            console.log(err);
        }
        console.log(result[0].content);
        res.send({'info':"OK","ret":0001,"friend_list":result})
    })
};

var getConcernList = function getConcernList(req,res){
    user_models.Userconcern.all([ "name", "Z" ],function(err,result){
        if(err){
            console.log(err);
        }
        console.log(result[0].content);
        res.send({'info':"OK","ret":0001,"friend_list":result})
    })
};


user.createUser = createUser;
user.loginUser = loginUser;
user.getUserInfo = getUserInfo;
user.getFriendList = getFriendList;
user.getConcernList = getConcernList;

module.exports = user;


