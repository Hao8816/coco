/**
 * The server
 */

var PORT = 8090;

var port = parseInt(process.argv[2]) || PORT;
var io = require('socket.io').listen(port);

var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));


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
