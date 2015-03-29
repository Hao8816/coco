var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
    //if(req.session.hasOwnProperty('username')){
        res.render('coco.ejs', { title: 'COCO' });
    //}else{
    //    res.render('coco-login.ejs', { title: 'COCO Login' });
    //}
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


router.post('/api/', function(req, res) {
    var params = req.param('data')
    console.log(params)
    res.render('coco-chat.ejs', { title: 'COCO Chat' });
});

module.exports = router;
