var elasticsearch = require('elasticsearch');

var elastic = {}
var client = elasticsearch.Client({
    host: 'onekoko.com:9200',
    sniffOnStart: true,
    sniffInterval: 30000
});

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
                            "query": "效果"
                        }
                    },{
                        "query_string": {
                            "default_field": "post.title",
                            "query": "效果"
                        }
                    }
                ]
            }
        },
        "from": 0,
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
    console.log(result_list)
});