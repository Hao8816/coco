var elasticsearch = require('elasticsearch');
var blog_models = require('./blog-models');
var async = require('async');
var logger = require('./logger-impl');


var elastic = {}
var client = elasticsearch.Client({
    host: 'onekoko.com:9200',
    sniffOnStart: true,
    sniffInterval: 30000
});

// 查询关键词对应的主题
var searchTopic = function searchTopic(req,res){
    var keyword = req.param('keyword');
    var page = parseInt(req.param('page'));
    client.search({
        index: 'topic',
        size: 10,
        body: {
            "query": {
                "bool": {
                    "should": [
                        {
                            "query_string": {
                                "default_field": "post.desc",
                                "query": keyword
                            }
                        },{
                            "query_string": {
                                "default_field": "post.title",
                                "query": keyword
                            }
                        }
                    ]
                }
            },
            "from": (page-1)*10,
            "size": 10,
            "sort": [{"time":"desc"}],
            "facets": {}
        }
    }).then(function (response) {
        //console.log(resp)
        var hits = response.hits;
        var result_list = []
        hits['hits'].forEach(function(obj){
            var topic_obj = obj['_source'];
            result_list.push(topic_obj)
        });
        res.send({'info':"OK","ret":0001,"topic_list":result_list})
    });
};


// 查询关键词对应的博客
var searchBlog = function searchBlog(req,res){
    var keyword = req.param('keyword');
    var page = parseInt(req.param('page'));
    client.search({
        index: 'blog',
        size: 10,
        body: {
            "query": {
                "bool": {
                    "should": [
                        {
                            "query_string": {
                                "default_field": "post.content",
                                "query": keyword
                            }
                        },{
                            "query_string": {
                                "default_field": "post.title",
                                "query": keyword
                            }
                        }
                    ]
                }
            },
            "from": (page-1)*10,
            "size": 10,
            "sort": [{"time":"desc"}],
            "facets": {}
        }
    }).then(function (response) {
        //console.log(resp)
        var hits = response.hits;
        var result_list = []
        hits['hits'].forEach(function(obj){
            var blog_obj = obj['_source'];
            result_list.push(blog_obj)
        });

        // 遍历博客列表，取得博客里面的回复
        async.each(result_list, function(obj,callback) {
            blog_models.Comment.find({blog_sha1:obj.sha1},[ "time", "Z" ],function(err,results){
                obj['comment_list'] = results || [];
                callback()
            });
        }, function(err){
            if( err ) {
                console.log('A file failed to process');
            } else {
                logger.error("blog_result:",result_list)
                res.send({'info':"OK","ret":0001,"blog_list":result_list})
            }
        });

    });
};


// 查询关键词对应的博客
var searchComment = function searchComment(req,res){
    var keyword = req.param('keyword');
    var page = parseInt(req.param('page'));
    client.search({
        index: 'comment',
        size: 10,
        body: {
            "query": {
                "bool": {
                    "should": [
                        {
                            "query_string": {
                                "default_field": "post.content",
                                "query": keyword
                            }
                        }
                    ]
                }
            },
            "from": (page-1)*10,
            "size": 10,
            "sort": [{"time":"desc"}],
            "facets": {}
        }
    }).then(function (response) {
        //console.log(resp)
        var hits = response.hits;
        var result_list = [];
        hits['hits'].forEach(function(obj){
            var comment_obj = obj['_source'];
            result_list.push(comment_obj)
        });
        res.send({'info':"OK","ret":0001,"comment_list":result_list})
    });
};


// 给主题建立索引
var indexTopic = function indexTopic(obj){
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
};


// 给博客建立索引
var indexBlog = function indexBlog(obj){
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
};

var indexComment = function indexComment(obj){

    client.index({
        index: 'comment',
        type: 'post',
        id: obj.sha1,
        body: obj
    }, function (err, resp) {
        if(err){
            console.log(err)
        }
    });
};

elastic["searchTopic"] = searchTopic;
elastic["searchBlog"] = searchBlog;
elastic["searchComment"] = searchComment;
elastic["indexTopic"] = indexTopic;
elastic["indexBlog"] = indexBlog;
elastic["indexComment"] = indexComment;

module.exports = elastic;