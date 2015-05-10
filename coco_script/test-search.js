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
        query: {
            match: {
                title: "昊哥"
            }
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
    console.log(result_list)
});