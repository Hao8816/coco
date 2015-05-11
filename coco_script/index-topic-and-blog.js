var elasticsearch = require('elasticsearch');

var blog_models = require('../coco_core/blog-models');

var client = elasticsearch.Client({
    host: 'onekoko.com:9200',
    sniffOnStart: true,
    sniffInterval: 30000
});

//// index a document

// 索引所有的主题
blog_models.Topic.all(function(err,result){
    result.forEach(function(obj){
        client.index({
            index: 'topic',
            type: 'post',
            id: obj.sha1,
            body: obj
        }, function (err, resp) {
            if(err){
                console.log(err)
            }
        });
    });
});

// 索引所有的博客
blog_models.Blog.all(function(err,result){

    result.forEach(function(obj){
        client.index({
            index: 'blog',
            type: 'post',
            id: obj.sha1,
            body: obj
        }, function (err, resp) {
            if(err){
                console.log(err)
            }
        });
    });
});



