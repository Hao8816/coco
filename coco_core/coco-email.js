var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sender@gmail.com',
        pass: 'password'
    }
});
transporter.sendMail({
    from: 'sender@address',
    to: 'receiver@address',
    subject: 'hello',
    text: 'hello world!'
});