/**
 * Client connects to server
 * receives and emits the 'msg' event
 */

var PORT = 8088;
var HOST = 'http://onekoko.com';
var NAME = 'jack'
var TO_NAME = 'rose'

var name = process.argv[2] || NAME;
var to_name = process.argv[3] || TO_NAME;

var io = require('socket.io-client');
var socket = io.connect(HOST + ':' + PORT);

socket.on('connect', function () {

    // send message to server
    socket.emit('login', {'name': name});
    var data_message = {
        'name':name,
        'to_name':to_name,
        'message':'hello'+to_name
    }
    socket.emit('message',data_message)
    // wait for messages
    socket.on('message', function(data) {
        console.log('new message received');

    });
});

socket.on('disconnect', function () {

    // send message to server
    console.log('connection break')

});
