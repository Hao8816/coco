var email = require('../coco_core/email-impl');
var user_models = require('../coco_core/user-models');
var async = require('async');
var logger = require('../coco_core/logger-impl');


var options = {
    from: '15238228816@163.com ',
    subject: 'COCO版本更新'
};
var date = new Date();
var month = date.getMonth()+1;
var date_string = date.getFullYear()+"-"+month+"-"+date.getDate();
var text_content = "新增博客的评论的功能!";
var html_content = "<div style='max-width: 500px ;margin: auto;border: 1px solid #f5f5f5;border-radius: 5px;'>" +
                   "<div style='text-align: center;padding: 10px;border-bottom: 1px solid #eee'><img src='http://onekoko.com/images/icons/logo.png' style='width: 60px;height: 60px;'></div>"+
                   "<div style='padding: 10px 20px;'><p style='color: #ff5277'>亲爱的VIP用户:</p>" +
                   "<p style='padding-left: 30px;font-size: 13px;'>"+text_content+"</p>" +
                   "<p style='text-align: right'>COCO博客</p>"+
                   "<p style='text-align: right'>"+date_string+"</p>"+
                   "</div></div>";

options['text'] = text_content;
options['html'] = html_content;

// 读取所有的VIP用户

var count = 0
user_models.User.all(function(err,result){
    if(err){
        logger.error("Get Users Error :",err);
    }
    result.forEach(function(obj){
        var user_email = obj.email;
        options['to'] = user_email;
        setTimeout(function(){
            email.sendEmail(options);
            logger.info("send notifiction email success!")
        },count*5000);
        count = count+1;
    });
});


