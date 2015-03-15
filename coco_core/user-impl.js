var user_models = require('./user-models');
var SHA1 = require('sha1');

var user={};
var createUser = function createUser(req,res){
    user_models.User.create([{
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
user.getUserInfo = getUserInfo;
user.getFriendList = getFriendList;
user.getConcernList = getConcernList;

module.exports = user;


