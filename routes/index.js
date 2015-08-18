var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/coco/login/')
});

router.get('/zss/', function(req, res) {
  res.render('coco-zss.ejs', { title: '张闪闪的作品' });
});

router.get('/zss/detail/', function(req, res){
  res.render('coco-zss-detail.ejs', { title: '张闪闪的作品详情' });
});


module.exports = router;
