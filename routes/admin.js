var express = require('express');
var router = express.Router();
var email = require('../coco_core/email-impl');
var user = require('../coco_core/user-impl');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('admin/coco-admin.ejs', { title: 'COCO Admin' });
});

router.get('/email/', function(req, res) {
  res.render('admin/coco-admin-email.ejs', { title: 'COCO Admin' });
});

router.get('/invite/', function(req, res) {
    res.render('admin/coco-admin-invite.ejs', { title: 'COCO Admin' });
});

router.get('/message/', function(req, res) {
  res.render('admin/coco-admin-message.ejs', { title: 'COCO Admin' });
});

router.get('/user/', function(req, res) {
  res.render('admin/coco-admin-user.ejs', { title: 'COCO Admin' });
});

// 发送邮件
router.post("/ajax/send_email/",function(req,res){
  var options = req.param('options');
  email.sendEmail(options);
  res.send({'info':"OK","ret":0001});
});

// 发送邮件
router.post("/ajax/send_invitation_email/",function(req,res){
  var options = req.param('options');
  email.sendInvitationEmail(options);
  res.send({'info':"OK","ret":0001});
});


router.get("/ajax/all_users/",function(req,res){
  user.getAllUserList(req,res)
});


module.exports = router;
