var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('coco-api-doc.ejs', { title: 'COCO API' });
});

router.get('/api/', function(req, res) {
    res.render('coco-api-doc.ejs', { title: 'COCO API' });
});


module.exports = router;
