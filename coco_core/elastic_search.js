var elasticsearch = require('elasticsearch');

// Connect to the this host's cluster, sniff
// for the rest of the cluster right away, and
// again every 5 minutes
var client = elasticsearch.Client({
    host: 'onekoko.com:9200',
    sniffOnStart: true,
    sniffInterval: 30000
});


//// index a document
//client.index({
//    index: 'blog',
//    type: 'post',
//    id: 1,
//    body: {
//        title: 'JavaScript Everywhere!',
//        content: 'It all started when...',
//        date: '2013-12-17'
//    }
//}, function (err, resp) {
//    // ...
//});



client.search({
    index: 'blog',
    size: 10,
    body: {
        query: {
            match: {
                title: 'JavaScript'
            }
        }
    }
}).then(function (resp) {
    //console.log(resp)
    var hits = resp.hits;
    console.log(hits['hits'][0]['_source']['content'])
});
