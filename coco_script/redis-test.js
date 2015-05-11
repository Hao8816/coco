var redis = require('redis');
var subscribe_client = redis.createClient();
var publish_client = redis.createClient();


subscribe_client.on('subscribe',function(channel,count){
    console.log(channel+'--'+count);
}).on('message',function(channel,message){
    console.log(channel+'>>'+message);
});

publish_client.on('publish',function(channel,message){
    console.log(channel+'<<'+message);
})

var subscribe = function(channel){
    subscribe_client.subscribe(channel);
}
var publish =  function(channel,message){
    publish_client.publish(channel,message);
}

exports.subscribe = subscribe;
exports.publish = publish;
