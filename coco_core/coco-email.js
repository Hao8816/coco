var nodemailer = require('nodemailer');


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

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});


//module.exports = transporter