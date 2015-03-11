var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('coco.ejs', { title: 'COCO' });
});

router.get('/chat/', function(req, res) {
    res.render('coco-chat.ejs', { title: 'COCO Chat' });
});


router.post('/api/', function(req, res) {
    var params = req.param('data')
    console.log(params)
    res.render('coco-chat.ejs', { title: 'COCO Chat' });
});

module.exports = router;
