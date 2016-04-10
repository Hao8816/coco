var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '好读书,读好书,读书好' });
});

router.get('/home/', function(req, res, next) {
  res.render('home', { title: '书友动态' });
});


module.exports = router;
