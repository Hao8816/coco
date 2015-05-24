//var app = require('express')();
var redis = require('redis');
var redis_client = redis.createClient();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
var async = require('async');
var logger = require('../coco_core/logger-impl');

var sub = redis.createClient();
var pub = redis.createClient();

//sub.subscribe('CHAT_MESSAGE')
//sub.on("message", function(pattern, key){
//    console.log(pattern)
//    console.log(key)
//    console.log('Chat Message Received')
//})

var io = require('socket.io')(8089);
var redisClient = require('socket.io-redis');
io.adapter(redisClient({ host: 'localhost', port: 6379 }));

var room_connection = io.of("/chat_room");
room_connection.on('connection',function(socket){
    socket.on('connect',function(){
        //socket.set('user_name','chenhao');
        console.log('connect to chat room');
    });
    socket.on('init_room',function(data){
       console.log(data);
    });
});



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
        var user_sha1 = msg['user_sha1'];
        var socket_id = this.id;
        // 更新用户信息
        redis_client.hset('CHAT_USER_STORE',user_sha1,this.id,function(err){
            if(err){
                console.log(err);
            }
        });
        // 检查用户消息盒子
        async.series({
                message_box: function(callback){
                    redis_client.hget('MESSAGE_BOX_STORE',user_sha1,function(err,data){
                        if(err){
                            console.log(err);
                        }
                        callback(null, data);
                    });
                }
            },
            function(err, results) {
               // if(results['message_box'])
                var message_box = JSON.parse(results['message_box'])
                io.sockets.connected[socket_id].emit('LOGIN_MESSAGE_SUCCESS',{'user_sha1':user_sha1,'socket_id':this.id,'message_box':message_box});
                // results is now equal to: {one: 1, two: 2}
            });
    });
    socket.on('CHAT_MESSAGE',function(msg){
        console.log(msg);
        // get friend name
        var friend_sha1 = msg['friend_sha1'];
        var my_sha1 = msg['my_sha1'];
        var chat_message = msg['chat_message'];
        // 根据不同的发送者，来分发消息
        // get user session id by name
        //pub.publish('CHAT_MESSAGE',chat_message);

        redis_client.hget('CHAT_USER_STORE',friend_sha1,function(err,data){
            if(err){
                console.log(err);
            }
            //console.log(io.sockets.connected)
            //console.log(data)
            if(data == null){
                console.log('Send Message Error');
            }else{
                if (io.sockets.connected[data]) {
                    io.sockets.connected[data].emit('CHAT_MESSAGE',{'friend_sha1':my_sha1,'my_sha1':friend_sha1,'chat_message':chat_message});
                }else{
                    console.log('Can not find Socket!');
                    // 检查用户消息盒子
                    async.series({
                            message_box: function(callback){
                                redis_client.hget('MESSAGE_BOX_STORE',friend_sha1,function(err,data){
                                    if(err){
                                        console.log(err);
                                    }
                                    callback(null, data);
                                });
                            }
                        },
                        function(err, results) {
                            var message_box = {}
                            if(results['message_box'] != null){
                                message_box = JSON.parse(results['message_box'])
                            }
                            var nb_message = message_box['chat-message'] || 0;
                            message_box['chat-message'] = nb_message + 1;

                            redis_client.hset('MESSAGE_BOX_STORE',friend_sha1,JSON.stringify(message_box),function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                        });
                }
            }
        });

        //socket.broadcast.emit('message',msg);
    });

    socket.on('BLOG_MESSAGE',function(msg){
        var action = msg['action'];
        var blog_sha1 = msg['blog_sha1'];
        // 取得用户的好友关系，给在线好友发送通知
        redis_client.hget('USER_FRIEND_STORE','',function(err,data){
            if(err){
                console.log(err)
            }
        });
        //设置用户信息的更新
        redis_client.hkeys("USER_INFO_STORE",function(err,result){
            if(err){
               logger.error("get cache user info error:",err);
            }
            result.forEach(function(obj){
                logger.debug("cached user info:",obj)
                async.series({
                        message_box: function(callback){
                            redis_client.hget('MESSAGE_BOX_STORE',obj,function(err,data){
                                if(err){
                                    console.log(err);
                                }
                                callback(null, data);
                            });
                        }
                },
                function(err, results) {
                    var message_box = {}
                    if(results['message_box'] != null){
                        message_box = JSON.parse(results['message_box'])
                    }
                    var nb_message = message_box['blog-message'] || 0;
                    message_box['blog-message'] = nb_message + 1;

                    redis_client.hset('MESSAGE_BOX_STORE',obj,JSON.stringify(message_box),function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                });
            });
        });

        socket.broadcast.emit('BLOG_MESSAGE',{'action':action,'blog_sha1':blog_sha1});
    });

    socket.on('TOPIC_MESSAGE',function(msg){
        var action = msg['action'];
        var topic_sha1 = msg['topic_sha1'];

        //设置用户信息的更新
        redis_client.hkeys("USER_INFO_STORE",function(err,result){
            if(err){
                logger.error("get cache user info error:",err);
            }
            result.forEach(function(obj) {
                async.series({
                        message_box: function (callback) {
                            redis_client.hget('MESSAGE_BOX_STORE', obj, function (err, data) {
                                if (err) {
                                    console.log(err);
                                }
                                callback(null, data);
                            });
                        }
                    },
                    function (err, results) {
                        var message_box = {}
                        if (results['message_box'] != null) {
                            message_box = JSON.parse(results['message_box'])
                        }

                        var nb_message = message_box['topic-message'] || 0;
                        message_box['topic-message'] = nb_message + 1;

                        redis_client.hset('MESSAGE_BOX_STORE', obj, JSON.stringify(message_box), function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                });
            });


        socket.broadcast.emit('TOPIC_MESSAGE',{'action':action,'topic_sha1':topic_sha1});
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



//// 创建httpserver
//http.listen(8089,function(){
//    console.log('start message server successfully, port 8089');
//});
