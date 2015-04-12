var client = io.connect('http://127.0.0.1:8089');
//var client = io.connect('http://onekoko.com:8089');

client.on('CONNECT',function(data) {
    console.log('Client has connected to the server!');
    console.log(data)

});

client.on('LOGIN_SUCESS',function(data){
    console.log(data);
});

client.on('CHAT_MESSAGE',function(data) {
    console.log(data);
    var chat_message = data['chat_message'];
    var friend_name = data['friend_name'];
    var my_name = data['my_name']
    var cache_key = my_name+'_'+friend_name;
    cacheChatMessage(cache_key,data)
    var message_number = $('li[u-id='+friend_name+']').find('.badge').text()
    if(message_number == ''){
        message_number = 1
    }else{
        message_number = parseInt(message_number)+1
    }
    $('li[u-id='+friend_name+']').find('.badge').text(message_number)
    // 从前端的好友列表中获取好友信息
    var friendImage = getFriendImage(friend_name);
    var message_template = $('.message_template').find('.message-item-left').clone();
    message_template.find('.content').text(friend_name+':'+chat_message);
    message_template.find('.image').attr('src',friendImage);
    $('#chat-history').append(message_template)
});
client.on('LOGIN_MESSAGE_SUCCESS',function(data){
    var user_name = data['user_name'];
    var socket_id = data['socket_id'];
    $('#my_name').text(user_name);
    $('.login_message_server').modal('hide');
    // 将用户登录信息存入sessionStorage
    sessionStorage.setItem('LOGIN_USER_INFO_NAME',user_name);
});

client.on('BLOG_MESSAGE',function(data){


});

client.on('TOPIC_MESSAGE',function(data){


});
client.on('DISCONNECT',function() {
    console.log('Client has disconnected from the server!');
});




function bindEnterKeySend(e){
    var e = e || window.event;
    if(e.keyCode == 13){
        sendChatMessage();
    }
}
function sendChatMessage() {
    if(!checkUserLoginStatus()){
//        return
    }

    var message = $('#chat-input').val();
    var my_name = $('#my_name').text();
    var friend_name = $('#friend_name').text();
    var message_dic = {'friend_name':friend_name,'my_name':my_name,'chat_message':message,'is_mine':true}
    client.emit('CHAT_MESSAGE',message_dic);
    var cache_key = my_name+'_'+friend_name;
    cacheChatMessage(cache_key,message_dic)
    var myImage = getFriendImage(my_name);
    var message_template = $('.message_template').find('.message-item-right').clone();
    message_template.find('.content').text(my_name+':'+message);
    message_template.find('.image').attr('src',myImage);
    $('#chat-history').append(message_template)
    $('#chat-input').val('');
}
function loginMessageServer(){
    var my_name = $('#login_name').val();
    client.emit('LOGIN_MESSAGE_SERVER',{'user_name':my_name});
}



//var room_client = io.connect('http://127.0.0.1:8089/chat_room');
//var room_client = io.connect('http://onekoko.com:8089/chat_room');
//console.log(room_client);
//room_client.on('connect',function(data){
//    console.log(data);
//    this.emit('init_room',{'name':'chat_room'});
//});

function cacheChatMessage(cache_key,message){
    var message_record = localStorage.getItem(cache_key+'_chat_message')
    if (message_record==null){
        var message_data = JSON.stringify([message])
        localStorage.setItem(cache_key+'_chat_message',message_data)
    }else{
        var new_message_data = JSON.parse(message_record);
        new_message_data.push(message);
        var message_data = JSON.stringify(new_message_data);
        localStorage.setItem(cache_key+'_chat_message',message_data)
    }
}

function showChatHistory(cache_key){
    var message_list = []
    var message_record = localStorage.getItem(cache_key+'_chat_message')
    if (message_record!=null){
        message_list = JSON.parse(message_record);
    }
    //return message_list;
    $('#chat-history').empty()
    for(var i=0;i<message_list.length;i++){
        var message = message_list[i];
        var chat_message = message.chat_message
        var sender = message.friend_name
        if (message.is_mine){
            sender = message.my_name
            var message_template = $('.message_template').find('.message-item-right').clone()
            //$('#chat-history').append('<div style="padding: 10px;margin: 2px;" class="item"><a class="message">'+sender+':'+chat_message+'</a></div>');
        }else{
            var message_template = $('.message_template').find('.message-item-left').clone()
            //$('#chat-history').append('<div style="padding: 10px;margin: 2px;width: 50%" class="item"><a class="message">'+sender+':'+chat_message+'</a></div>');
        }
        //var message_template = $('.message_template').find('.message-item-left').clone()
        message_template.find('.content').text(sender+':'+chat_message)
        $('#chat-history').append(message_template)
    }
}

function checkUserLoginStatus(){
    var login_status = true
    var user_name = sessionStorage.getItem('LOGIN_USER_INFO_NAME');
    if (user_name==null){
        login_status=false
    }
    return login_status
}

function showUserInfo(){
    $('.user_info_modal').modal('show')
}

function getFriendImage(friend_name){
    var friend_list = localStorage.getItem('FRIEND_INFO_DICT');
    var friend_info_dict = JSON.parse(friend_list);
    var image_url = 'default.jpg';
    if (friend_info_dict.hasOwnProperty(friend_name)){
        image_url = friend_info_dict[friend_name].head_image;
    }
    return '/images/'+image_url

}
