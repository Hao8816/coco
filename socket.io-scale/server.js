/**
 * The server
 */

var PORT = 8090;

var port = parseInt(process.argv[2]) || PORT;


console.log('server listens on port ' + port);


var io = require('socket.io').listen(port);
var redis = require('redis');

var RedisStore = require('socket.io-redis');
var pub = redis.createClient();
var sub = redis.createClient();
var client = redis.createClient();

// use redis as store (default is memory)
io.set('store', new RedisStore({
      redisPub: pub,
      redisSub: sub,
      redisClient : client
}));




io.sockets.on('connection', function (socket) {
    console.log(io.RedisStore)
            
var nb_connection = io.sockets.sockets.length
    for(var i=0;i<nb_connection;i++){
        console.log(io.sockets.sockets[i]['id'])
    }
    // simple event: receive a msg and broadcast it to all clients
    socket.on('msg', function (data) {
        console.log(data)
        socket.broadcast.emit('msg', data);
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
