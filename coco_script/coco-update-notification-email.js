var email = require('../coco_core/email-impl');
var user_models = require('../coco_core/user-models');
var async = require('async');
var logger = require('../coco_core/logger-impl');



// 读取所有的VIP用户

var count = 0;
var option_list = [];
user_models.User.all(function(err,result){
    if(err){
        logger.error("Get Users Error :",err);
    }
    result.forEach(function(obj){
        var options = {
            from: '15238228816@163.com ',
            subject: 'COCO版本更新'
        };
        var date = new Date();
        var month = date.getMonth()+1;
        var date_string = date.getFullYear()+"-"+month+"-"+date.getDate();
        var text_content = "新增博客的评论的功能,欢迎各位VIP抢鲜体验，详情狂点 http://onekoko.com";
        var html_content = "<div style='max-width: 500px ;margin: auto;border: 1px solid #f5f5f5;border-radius: 5px;'>" +
            "<div style='text-align: center;padding: 10px;border-bottom: 1px solid #eee'><img src='http://onekoko.com/images/icons/logo.png' style='width: 60px;height: 60px;'></div>"+
            "<div style='padding: 10px 20px;'><p style='color: #ff5277'>亲爱的VIP用户:</p>" +
            "<p style='padding-left: 30px;font-size: 13px;'>"+text_content+"</p>" +
            "<p style='text-align: right'>COCO博客</p>"+
            "<p style='text-align: right'>"+date_string+"</p>"+
            "</div></div>";

        options['text'] = text_content;
        options['html'] = html_content;

        var user_email = obj.email;
        options['to'] = user_email;
        option_list.push(options);
    });
});

setInterval(function(){
    logger.debug("options info",option_list);
    email.sendEmail(option_list[count]);
    logger.debug(option_list[count]);
    logger.info("send notifiction email success!");
    count = count+1;
},5000)


