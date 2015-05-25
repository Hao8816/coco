var elasticsearch = require('elasticsearch');
var async = require('async');


var elastic = {}
var client = elasticsearch.Client({
    host: 'onekoko.com:9200',
    sniffOnStart: true,
    sniffInterval: 30000
});

// 给主题建立索引
var indexStock = function indexTopic(obj){
    client.index({
        index: 'stock',
        type: 'news',
        id: obj.sha1,
        body: obj
    }, function (err, resp) {
        if(err){
            console.log(err)
        }
    });
};
elastic["indexStock"] = indexStock;

module.exports = elastic;