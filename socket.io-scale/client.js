/**
 * Client connects to server
 * receives and emits the 'msg' event
 */

var PORT = 8090;
var HOST = 'localhost';

var port = parseInt(process.argv[2]) || PORT;

console.log('client connects to port ' + port);

var io = require('socket.io-client');
var socket = io.connect(HOST + ':' + PORT);

socket.on('connect', function () {

    // send message to server
    socket.emit('msg', {'foo': 'bar'});
    console.log('----')
    // wait for messages
    socket.on('msg', function(data) {
        console.log('new message received');
    });
});
