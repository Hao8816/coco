var express = require('express');
var router = express.Router();
var user = require('../coco_core/user-impl');
var blog = require('../coco_core/blog-impl');


/* GET home page. */
router.get('/', function(req, res){
    res.render('coco.ejs', { title: 'COCO 博客' });
});

/* GET home page. */
router.get('/zss/', function(req, res){
    res.render('coco-zss.ejs', { title: '张闪闪的作品' });
});

router.get('/zss/detail/', function(req, res){
    res.render('coco-zss-detail.ejs', { title: '张闪闪的作品详情' });
});

router.get('/chat/', function(req, res) {
    res.render('coco-chat.ejs', { title: 'COCO Chat' });
});

router.get('/index/', function(req, res) {
    res.render('coco-index.ejs', { title: 'COCO' });
});

router.get('/blog/', function(req, res) {
    res.render('coco-blog.ejs', { title: 'COCO Blog' });
});


router.get('/message/', function(req, res) {
    res.render('coco-message.ejs', { title: 'COCO Blog' });
});


router.get('/login/', function(req, res) {
    res.render('coco-login.ejs', { title: 'COCO Login' });
});

router.get('/register/', function(req, res) {
    res.render('coco-register.ejs', { title: 'COCO Register' });
});

router.get('/logout/', function(req, res) {
    res.render('coco-login.ejs', { title: 'COCO Login' });
});

router.get('/help/', function(req, res) {
    res.render('coco-help.ejs', { title: 'COCO Help' });
});

router.get('/account/', function(req, res) {
    res.render('coco-account.ejs', { title: 'COCO Me' });
});

router.get('/active/account/', function(req, res) {
    user.activeUserAccount(req,res);
});


/* 读取文件内容  */
router.get('/file',function(req,res){
    blog.getFile(req,res)
});

/* 读取文件内容  */
router.get('/origin_file',function(req,res){
    blog.getOriginFile(req,res)
});

router.post('/api/', function(req, res) {
    var params = req.param('data')
    console.log(params)
    res.render('coco-chat.ejs', { title: 'COCO Chat' });
});

module.exports = router;
