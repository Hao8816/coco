var nodemailer = require('nodemailer');
var logger = require('./logger-impl');
var user_models = require('../coco_core/user-models');
var async = require('async');
var email = {};

// 邮件传输对象
var transporter = nodemailer.createTransport({
    host:"smtp.163.com",
    port:"25",
    auth: {
        user: '15238228816@163.com',
        pass: 'chenhao8816'
    }
});

// 邮件的默认配置
var mailOptions = {
    from: '15238228816@163.com ', // sender address
    to: '15238228816@163.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// 发送邮件的接口
var sendEmail = function sendEmail(options){
    transporter.sendMail(options, function(error, info){
        if(error){
            logger.error(error)
        }else{
            logger.info('Message sent: ' + info.response)
        }
    });
};

var sendNotificationEmail = function sendNotificationEmail(options){
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
        "<p style='padding-left: 60px;font-size: 13px;'>不好意思！刚刚的测试影响到大家了。如果有任何不满，请到<a href='http://onekoko.com'>http://onekoko.com</a>发博客来宣泄一下。</p>" +
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
            transporter.sendMail(options, function(error, info){
                if(error){
                    logger.error(error)
                }else{
                    logger.info('Message sent: ' + info.response)
                }
            });
        });
    });


};

var sendValidateEmail = function sendValidateEmail(uid,address){
    var options = {
        from: '15238228816@163.com ',
        subject: 'COCO邮箱验证'
    };
    var date = new Date();
    var month = date.getMonth()+1;
    var date_string = date.getFullYear()+"-"+month+"-"+date.getDate();
    var active_link = "http://onekoko.com/coco/active/account/?uid="+uid;
    var text_content = "欢迎大家使用COCO博客!";
    var html_content = "<div style='max-width: 450px ;margin: auto;border: 1px solid #f5f5f5;border-radius: 5px;padding: 30px'>" +
        "<p>亲爱的VIP用户:</p>" +
        "<p style='padding-left: 60px;font-size: 13px;'>谢谢你对COCO的支持，点击<a href="+active_link+">"+active_link+"</a>来激活你的账号，开始你的COCO之旅。</p>" +
        "<p style='text-align: right'>COCO博客</p>"+
        "<p style='text-align: right'>"+date_string+"</p>"+
        "</div>";

    options['text'] = text_content;
    logger.debug(html_content);
    options['html'] = html_content;
    options['to'] = address;
    transporter.sendMail(options, function(error, info){
        if(error){
            logger.error(error)
        }else{
            logger.info('Message sent: ' + info.response)
        }
    });

};


email["sendEmail"] = sendEmail;
email["sendValidateEmail"] = sendValidateEmail;

module.exports = email;