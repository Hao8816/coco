var elasticsearch = require('elasticsearch');

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
        res.send({'info':"OK","ret":0001,"blog_list":result_list})
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

elastic["searchTopic"] = searchTopic;
elastic["searchBlog"] = searchBlog;
elastic["indexTopic"] = indexTopic;
elastic["indexBlog"] = indexBlog;

module.exports = elastic;