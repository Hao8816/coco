var elasticsearch = require('elasticsearch');

// Connect to the this host's cluster, sniff
// for the rest of the cluster right away, and
// again every 5 minutes
var client = elasticsearch.Client({
    host: 'xinhua4.tmlsystem.com:9090',
    sniffOnStart: true,
    sniffInterval: 3000000
});
client.search({
    index: 'tml-engine',
    size: 10,
    body: {
        query: {
            match: {
                site: '东方网'
            }
        }
    }
}).then(function (resp) {
    //console.log(resp)
    var hits = resp.hits;
    console.log(hits['hits'][0]['_source']['content'])
});
