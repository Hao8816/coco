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
io.adapter(adapter({ pubClient: pub, subClient: sub }));
var message_server_url = host+":"+port

// 每个不同的消息服务器，根据ip和端口，订阅不同的通道信息

sub.on("subscribe", function (channel, count) {
    console.log(channel)
    console.log(count)
});
sub.subscribe(message_server_url);


io.sockets.on('connection', function (socket) {
    var nb_connection = io.sockets.sockets.length
    for(var i=0;i<nb_connection;i++){
        console.log(io.sockets.sockets[i]['id'])
    }
    // simple event: receive a msg and broadcast it to all clients
    socket.on('msg', function (data) {
        // 以后从redis中查询用户所在的服务器
        message_servers.forEach(function(obj){
            if (obj != message_server_url){
                pub.publish(obj,data)
                console.log(data)
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
