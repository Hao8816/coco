var blog_models = require('../coco_core/blog-models');
var user_models = require('../coco_core/user-models');
var async = require('async');

// 查询数据库所有用户
user_models.User.all(function(err,result){
    if(err){
        console.log(err);
    }
    console.log(result);
    result.forEach(function(obj){
        var user_sha1 = obj.sha1;
            // 获取用户的博客的数量
            async.series({
                'get_blog_num':function(callback){
                    blog_models.Blog.count({ creator_sha1: user_sha1 }, function (err, count) {
                        callback(null,count)
                    });
                },
                'get_topic_num':function(callback){
                    blog_models.Topic.count({ creator_sha1: user_sha1 }, function (err, count) {
                        callback(null,count)
                    });
                },
                'get_friend_num':function(callback){
                    user_models.Friendship.count({ my_sha1: user_sha1 }, function (err, count) {
                        callback(null,count)
                    });
                }
            },function(err,result){
                console.log(result)
                user_models.User.find({ sha1: user_sha1 }).each(function (user) {
                    user.nb_blog = result['get_blog_num'];
                    user.nb_topic = result['get_topic_num'];
                    user.nb_friend = result['get_friend_num'];

                }).save(function (err) {
                    // done!
                    console.log('update nb_blog success')
                });
            });
    });
});