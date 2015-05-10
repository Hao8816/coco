var elasticsearch = require('elasticsearch');

var elastic = {}
var client = elasticsearch.Client({
    host: 'onekoko.com:9200',
    sniffOnStart: true,
    sniffInterval: 30000
});


var searchTopic = function searchTopic(req,res){
    var keyword = req.param('keyword');
    var page = parseInt(req.param('page'));
    client.search({
        index: 'topic',
        size: 10,
        body: {
            query: {
                "should": [
                    {
                        "query_string": {
                            "default_field": "post.title",
                            "query": keyword
                        }
                    },
                    {
                        "query_string": {
                            "default_field": "post.desc",
                            "query": keyword
                        }
                    }
                ]
            }
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

elastic["searchTopic"] = searchTopic;

module.exports = elastic;