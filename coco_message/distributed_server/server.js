/**
 * The server
 */


var message_servers = [
    "0.0.0.0:8089",
    "0.0.0.0:8090",
    "0.0.0.0:8091"
]
var PORT = 8090;
var HOST = "0.0.0.0"
var port = parseInt(process.argv[2]) || PORT;
var host = parseInt(process.argv[3]) || HOST;
var io = require('socket.io').listen(port);

//var redis = require('socket.io-redis');
//io.adapter(redis({ host: 'localhost', port: 6379 }));

var redis = require('redis').createClient;
var adapter = require('socket.io-redis');
var pub = redis('6379', '127.0.0.1', { auth_pass: "coco" });
var sub = redis('6379', '127.0.0.1', { detect_buffers: true, auth_pass: "coco" });
var redis_client = redis('6379', '127.0.0.1');
//io.adapter(adapter({ pubClient: pub, subClient: sub }));
var message_server_url = host+":"+port

// 每个不同的消息服务器，根据ip和端口，订阅不同的通道信息

sub.on('subscribe', function (channel, count) {
    console.log(channel)
    console.log(count)

});
sub.on('message',function(channel, message){
    console.log(channel)
    console.log(message.toString())
    var data = JSON.parse(message.toString())
    var to_name = data['to_name']
    redis_client.hget('CONNECTED_USER_IDS',to_name,function(err,result){
       if (err){
           console.log(err)
       }

        io.sockets.connected[result].emit('message',data)
    });



});
sub.subscribe(message_server_url);


io.sockets.on('connection', function (socket) {
    var nb_connection = io.sockets.sockets.length
    for(var i=0;i<nb_connection;i++){
        console.log(io.sockets.sockets[i]['id'])
    }
    socket.on('login',function(data){
        console.log(data)
        var user_name = data['name']
        redis_client.hset('CONNECTED_USERS',user_name,message_server_url,function(err){
            if (err){

            }
        });
        redis_client.hset('CONNECTED_USER_IDS',user_name,this.id,function(err){
            if (err){

            }
        });
    });
    // simple event: receive a msg and broadcast it to all clients
    socket.on('message', function (data) {
        // 以后从redis中查询用户所在的服务器
        var user_name = data['name'];
        var to_name = data['to_name'];
        var message = data['message'];
        // 获取用户登录message server

        redis_client.hget('CONNECTED_USERS',to_name,function(err,result){
            if(err){
                console.log(err)
            }
            console.log(result)
            if (result == message_server_url){
                redis_client.hget('CONNECTED_USER_IDS',to_name,function(err,result){
                    if (err){
                        console.log(err)
                    }
                    if (io.sockets.connected.hasOwnProperty(result)){
                        io.sockets.connected[result].emit('message',data)
                    }
                });
            }else {

                pub.publish(data, JSON.stringify(data))
            }
        });
    });

});

io.sockets.on('disconnect', function (socket) {
    console.log(io.sockets.sockets.length)
    var nb_connection = io.sockets.sockets.length
    for(var i=0;i<nb_connection;i++){
        console.log(io.sockets.sockets[i]['id'])
    }
    io.sockets.sockets.remove(socket)
    // simple event: receive a msg and broadcast it to all clients
});
