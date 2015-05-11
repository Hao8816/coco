var nodemailer = require('nodemailer');
var logger = require('./logger-impl');
var email = {};

var transporter = nodemailer.createTransport({
    host:"mail.onekoko.com",
    port:"25"
    //auth: {
    //    user: '15238228816@163.com',
    //    pass: 'chenhao8816'
    //}
});

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


email["sendEmail"] = sendEmail;

module.exports = email;