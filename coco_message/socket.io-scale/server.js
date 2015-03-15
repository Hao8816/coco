/**
 * The server
 */

var PORT = 8090;

var port = parseInt(process.argv[2]) || PORT;
var io = require('socket.io').listen(port);

var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));


io.sockets.on('connection', function (socket) {
    console.log(io.sockets.scokets.length)
    // simple event: receive a msg and broadcast it to all clients
    socket.on('msg', function (data) {
        console.log(data)
        socket.broadcast.emit('msg', data);
    });
});
