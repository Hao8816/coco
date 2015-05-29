//var client = io.connect('http://127.0.0.1:8089');
var client = io.connect('http://onekoko.com:8089');

// 定义一个消息盒子，并且初始化在缓存中的数据
var MESSAGE_BOX = {};
var PAGE_INDEX = 0;

client.on('connect',function(data) {
    console.log('Client has connected to the server!');
    console.log(data);
});

client.on('CHAT_MESSAGE',function(data) {
    console.log(data);
    var chat_message = data['chat_message'];
    var friend_sha1 = data['friend_sha1'];
    var my_sha1 = data['my_sha1'];
    var cache_key = my_sha1+'_'+friend_sha1;
    cacheChatMessage(cache_key,data);
    // 判断当前页面是不是在消息页面
    if (PAGE_INDEX == 2){
        var message_number = $('div[uid='+friend_sha1+']').find('.message-badge').text() || 0;
        message_number = parseInt(message_number)+1;
        $('div[uid='+friend_sha1+']').find('.message-badge').text(message_number);
    }else{
        var message_number = $('.nav-kit').find('.friend-badge').text() || 0;
        message_number = parseInt(message_number)+1;
        $('.nav-kit').find('.friend-badge').text(message_number);
        // 未读消息存到前端缓存
        var unread_messages = localStorage.getItem("UNREAD_MESSAGE_NUM") || '{}';
        unread_messages = JSON.parse(unread_messages);
        if (unread_messages.hasOwnProperty(friend_sha1)){
            unread_messages[friend_sha1] = parseInt(unread_messages[friend_sha1]) + 1;
        }else{
            unread_messages[friend_sha1] = 1;
        }
        localStorage.setItem('UNREAD_MESSAGE_NUM',JSON.stringify(unread_messages));
    }
    // 从前端的好友列表中获取好友信息
    var friendImage = getFriendImage(friend_sha1);
    var message_template = $('.message_template').find('.message-item-left').clone();
    message_template.find('.content').text(chat_message);
    message_template.find('.image').attr('src',friendImage);
    $('#chat-history').append(message_template);
    $('#chat-history').scrollTop(10000)
});
client.on('LOGIN_MESSAGE_SUCCESS',function(data){
    var user_sha1 = data['user_sha1'];
    var socket_id = data['socket_id'];
    $('#my_name').attr('uid',user_sha1);
    $('.login_message_server').modal('hide');
    // 将用户登录信息存入sessionStorage
    sessionStorage.setItem('LOGIN_USER_INFO_SHA1',user_sha1);
    // 用户登录message server之后，检查用户的消息更新
    var message_box = data['message_box'] || {};
    MESSAGE_BOX = message_box;
    // 需要清空前段的主题缓存
    if(message_box.hasOwnProperty('blog-message')){
        
    }
    if(message_box.hasOwnProperty('topic-message')){
        localStorage.removeItem('TOPIC_INFO_LIST');
    }
    if(message_box.hasOwnProperty('friend-message')){

    };
});

client.on('USER_ONLINE_STATUS',function(data){
    console.log(data);
    var user_sha1 = data['friend_sha1'];
    var status = data['status'];
    updateUserOnlineStatus(user_sha1,status);
});

client.on('BLOG_MESSAGE',function(data){
    console.log(data);
    if(data['action'] == 'add_blog'){
         var nb_blog_message = parseInt($('.blog-badge').text())||0;
         $('.blog-badge').text(nb_blog_message+1);
    }
});


client.on('TOPIC_MESSAGE',function(data){
    console.log(data);
    if(data['action'] == 'add_topic'){
        var nb_topic_message = parseInt($('.topic-badge').text())||0;
        $('.topic-badge').text(nb_topic_message+1);
        localStorage.removeItem('TOPIC_INFO_LIST');
    }
});


client.on('disconnect',function() {
    console.log('Client has disconnected from the server!');
});


function sendBlogMessage(action,blog_sha1){
    var message_dic = {'action':action,'blog_sha1':blog_sha1};
    client.emit('BLOG_MESSAGE',message_dic);
}

function sendTopicMessage(action,topic_sha1){
    var message_dic = {'action':action,'topic_sha1':topic_sha1};
    client.emit('TOPIC_MESSAGE',message_dic);
}


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
    var my_sha1 = sessionStorage.getItem('LOGIN_USER_SHA1');
    var friend_sha1 = $('#friend_name').attr('fid');
    var message_dic = {'friend_sha1':friend_sha1,'my_sha1':my_sha1,'chat_message':message,'is_mine':true}
    client.emit('CHAT_MESSAGE',message_dic);
    var cache_key = my_sha1+'_'+friend_sha1;
    cacheChatMessage(cache_key,message_dic)
    var myImage = getFriendImage(my_sha1);
    var message_template = $('.message_template').find('.message-item-right').clone();
    message_template.find('.content').text(message);
    message_template.find('.image').attr('src',myImage);
    $('#chat-history').append(message_template);
    $('#chat-history').scrollTop(10000);
    $('#chat-input').val('');
}
function loginMessageServer(){
    var my_name = $('#login_name').val();
    client.emit('LOGIN_MESSAGE_SERVER',{'user_name':my_name});
}


function updateUnreadMessageNum(){


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
    var message_list = [];
    var message_record = localStorage.getItem(cache_key+'_chat_message');
    if (message_record!=null){
        message_list = JSON.parse(message_record);
    }
    //return message_list;
    $('#chat-history').empty();
    for(var i=0;i<message_list.length;i++){
        var message = message_list[i];
        var chat_message = message.chat_message;
        if (message.is_mine){
            var message_template = $('.message_template').find('.message-item-right').clone();
            var image_url = getFriendImage(message.my_sha1);
        }else{
            var message_template = $('.message_template').find('.message-item-left').clone();
            var image_url = getFriendImage(message.friend_sha1);
        }
        message_template.find('.image').attr('src',image_url);
        message_template.find('.content').text(chat_message);
        $('#chat-history').append(message_template);
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

function getFriendImage(friend_sha1){
    var friend_list = localStorage.getItem('FRIEND_INFO_DICT');
    var friend_info_dict = JSON.parse(friend_list);
    var image_url = 'default.jpg';
    if (friend_info_dict.hasOwnProperty(friend_sha1)){
        image_url = friend_info_dict[friend_sha1].head_image;
    }
    return '/images/'+image_url

}

function updateUserOnlineStatus(user_sha1,status){
    // 如果是新上线，更新显示状态，如果下线，显示在后面
    if(status == 'online'){
        $('div[uid='+user_sha1+']').find('.offline-mark').hide();
        $('div[uid='+user_sha1+']').find('.online-mark').attr('ng-show','true').removeClass('ng-hide');
    }else{
        $('div[uid='+user_sha1+']').find('.offline-mark').attr('ng-show','true').removeClass('ng-hide');
        $('div[uid='+user_sha1+']').find('.online-mark').hide();
    }
}
