var blog_models = require('../coco_core/blog-models');
var async = require('async');

// 查询数据库所有用户
blog_models.Blog.all(function(err,result){
    if(err){
        console.log(err);
    }
    console.log(result[0]);
    result.forEach(function(obj){
        var blog_sha1 = obj.sha1;
        var topic_sha1 = obj.topic_sha1;
        if (topic_sha1 == null){
            topic_sha1 = '0'
        }
        console.log(topic_sha1)
        // 获取用户的博客的数量
        blog_models.Topic.find({ sha1: topic_sha1 }).each(function (topic) {

            var related_sha1s = topic.related
            related_sha1s.push(blog_sha1)
            topic.related = JSON.stringify(related_sha1s);
            topic.update_time = obj.time;

        }).save(function (err) {
            // done!
            console.log('update topic info success')
        });
    });
});