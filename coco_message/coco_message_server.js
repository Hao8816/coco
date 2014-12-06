var app = require('express')();
var redis = require('redis');
var redis_client = redis.createClient();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// 监听connection的变化

io.on('connection',function(socket){
    //console.log(socket)
    console.log('receive a socket connection');
    //io.sockets.socket(socket.id).emit('message', 'for your eyes only');
    socket.on('connect',function(){
        //socket.set('user_name','chenhao');
        //console.log(socket.id);
    });
    socket.on('LOGIN_MESSAGE_SERVER',function(msg){
        var user_name = msg['user_name'];
        console.log(user_name);
        this.emit('LOGIN_MESSAGE_SUCCESS',this.id);
        redis_client.hset('CHAT_USER_STORE',user_name,this.id,function(err){
            if(err){
                console.log(err);
            }
        })
    });
    socket.on('CHAT_MESSAGE',function(msg){
        console.log(msg);
        // get friend name
        var friend_name = msg['friend_name'];
        var chat_message = msg['chat_message'];
        // 根据不同的发送者，来分发消息
        // get user session id by name
        redis_client.hget('CHAT_USER_STORE',friend_name,function(err,data){
            if(err){
                console.log(err);
            }
            if(data == null){
                console.log('Send Message Error');
            }else{
                if (io.sockets.connected[data]) {
                    io.sockets.connected[data].emit('CHAT_MESSAGE',chat_message);
                }else{
                    console.log('Can not find Socket!')
                }
            }
        });

        //socket.broadcast.emit('message',msg);
    });
    socket.on('set_name',function(msg){
        console.log(msg);
    });
    socket.on('disconnect',function(msg){
        console.log(msg+'----');
        io.emit('message',msg);
    });
});

io.on('disconnect',function(socket){
    console.log('disconnect from server');
});

io.on('error',function(socket){
    console.log('error from server');
});

// 创建httpserver
http.listen(8089,function(){
    console.log('start message server successfully, port 8089');
});