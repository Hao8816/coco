var user_models = require('./user-models');
var SHA1 = require('sha1');
var async = require('async');
var orm = require("orm");
var settings = require('../config/db-config');
var email_client = require('./email-impl');


var db = orm.connect(settings.mysql,function(err,db){
    if (err){
        console.log(err)
        console.log('Can not connect to mysql!');
    }else{
        console.log("Connect sucessfully!");
    }
});
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
        nb_topic      : 0,     // 主题的数量
        status        : 0     // 主题的数量
    }],function (err,item){
        console.log(err);
    });

    // 发送验证邮件
    email_client.sendValidateEmail(sha1,email);

    res.send({'info':"OK","ret":0001})
    console.log(req)
};


var loginUser = function loginUser(req,res){
    var name = req.param('name')
    if (req.param('password_app')){
        var password = SHA1(SHA1(req.param('password_app')))
    }else{
        var password = req.param('password')
    }
    user_models.User.find({name:name,password:password},function(err,result){
        if(err){
            console.log(err);
            res.send({'info':"ERROR","ret":1001})
            return
        }
        if (result[0]!=null){
            if (result[0].status == 1){
                // 更新sessiong
                req.session['username'] = name;
                res.send({'info':"OK","ret":0001,"user":result[0]})
            }else{
                res.send({'info':"Not Active","ret":1002})
            }

        }else{
            res.send({'info':"ERROR","ret":1001})
        }
    })
};


var validateAccount = function validateAccount(req,res){

    var name = req.param('name')
    if (req.param('password_app')){
        var password = SHA1(SHA1(req.param('password_app')))
    }else{
        var password = req.param('password')
    }
    user_models.User.find({name:name,password:password},function(err,result){
        if(err){
            logger.error(err);
            res.send({'info':"ERROR","ret":1001});
            return
        }
        if (result[0]!=null){
            result[0].status = 1
            result[0].save(function (err) {
                logger.error("Save ")
            });
            // 更新sessiong
            req.session['username'] = name;
            res.send({'info':"OK","ret":0001,"user":result[0]})
        }else{
            res.send({'info':"ERROR","ret":1001})
        }
    });
};


var setUserImage = function setUserImage(req,res){
    var imagesha1 = req.param('imagesha1')
    var usersha1 = req.param('usersha1')
    user_models.User.find({sha1:usersha1},function(err,result){
        if(err){
            console.log(err);
            res.send({'info':"ERROR","ret":1001})
            return
        }
        if (result[0]!=null){
            result[0].head_image = imagesha1;
            result[0].save(function(err){
                if(err){
                    console.log(err)
                }
                console.log("saved!")
            });
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

var activeUserAccount = function activeUserAccount(req,res){
    var user_sha1 = req.param("uid");
    user_models.User.find({sha1:user_sha1},function(err,result){
        if(err){
            console.log(err);
        }
        var user_object = ""
        if (result.length == 1){
            user_object = result[0];
        }
        res.render('coco-active-account.ejs', { title: 'COCO Active Account', user : user_object});
    })
};


var getFriendList = function getFriendList(req,res){

    // get rrecord from redis
    user_models.Friendship.all([ "time", "Z" ],function(err,result){
        if(err){
            console.log(err);
        }
        db.driver.execQuery('SELECT * FROM user',function (err, data) {
            res.send({'info':"OK","ret":0001,"friend_list":data})
        });
    });

    //user_models.Friendship.all([ "time", "Z" ],function(err,result){
    //    if(err){
    //        console.log(err);
    //    }
    //    console.log(result[0].content);
    //    // 获取用户的详细信息
    //    var friend_list = [];
    //    for(var i=0;i<result.length;i++){
    //        //
    //        var firend_sha1 = result[i].friend_sha1;
    //        user_models.User.find({sha1:firend_sha1},function(err,friend){
    //            friend_list.push(friend[0]);
    //        });
    //    }
    //
    //    res.send({'info':"OK","ret":0001,"friend_list":friend_list})
    //})
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


// 获取当前系统所有用户信息
var getAllUserList = function getAllUserList(req,res){
    user_models.User.all([ "time", "Z" ],function(err,result){
        if(err){
            console.log(err);
        }
        res.send({'info':"OK","ret":0001,"user_list":result})
    });
};

user.createUser = createUser;
user.loginUser = loginUser;
user.setUserImage = setUserImage;
user.getUserInfo = getUserInfo;
user.getFriendList = getFriendList;
user.getConcernList = getConcernList;
user.getAllUserList = getAllUserList;
user.activeUserAccount = activeUserAccount;
user.validateAccount = validateAccount;

module.exports = user;


