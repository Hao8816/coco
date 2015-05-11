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
var text_content = "欢迎大家使用COCO博客!";
var html_content = "<div style='width: 500px;margin: auto;border: 1px solid #f5f5f5;border-radius: 5px;padding: 30px'>" +
                   "<p>亲爱的VIP用户:</p>" +
                   "<p style='padding-left: 60px;'>不好意思！刚刚的测试影响到大家了。如果有任何不满，请到<a href='http://onekoko.com'>http://onekoko.com</a>发博客来宣泄一下。</p>" +
                   "<p style='text-align: right'>COCO博客</p>"+
                   "<p style='text-align: right'>"+date_string+"</p>"+
                   "</div>";

options['text'] = text_content;
options['html'] = html_content;

// 读取所有的VIP用户

user_models.User.all(function(err,result){
    if(err){
        logger.error("Get Users Error :",err);
    }
    result.forEach(function(obj){
        var user_email = obj.email;
        options['to'] = user_email;
        email.sendEmail(options);
        logger.info("send notifiction email success!")
    });
});


