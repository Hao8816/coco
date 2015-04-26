var blog_models = require('../coco_core/blog-models');
var async = require('async');

// 查询数据库所有用户
blog_models.Topic.all(function(err,result){
    if(err){
        console.log(err);
    }
    console.log(result[0]);
    result.forEach(function(obj){
        var topic_sha1 = obj.sha1
        async.series({
            'get_blog_sha1':function(callback){
                blog_models.Blog.find({topic_sha1:topic_sha1},function(err,blog_list) {
                    var blog_sha1s = [];
                    blog_list.forEach(function(object){
                        blog_sha1s.push(object.sha1)
                    });
                    callback(null,blog_sha1s)
                });
            }
        },function(err,data){
            console.log(data)
            blog_models.Topic.find({ sha1: topic_sha1 }).each(function (topic) {
                topic.related = JSON.stringify(data["get_blog_sha1"]);

            }).save(function (err) {
                // done!
                console.log('update nb_blog success')
            });
        });



    })


});