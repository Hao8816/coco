var express = require('express');
var router = express.Router();
var blog = require('../coco_core/blog-impl');
var user = require('../coco_core/user-impl');

/* GET home page. */
router.get('/', function(req, res) {
    var params = req.param('data')
    console.log(params)
    res.render('coco-chat.ejs', { title: 'COCO Chat' });
});

router.post('/', function(req, res) {
    // api 里面的参数传递在body里面
    var rsdic = {}
    var params = req.body;
    if (params.hasOwnProperty('action') == false){
        rsdic['info'] = "params error"
        rsdic['ret'] = '0001'
        res.send(rsdic)
    }
    blog.getBlogList(req,res);
});

var apiURL = {
    "index" : "",
    "share" : ""
}

function apiRoute(){


}

module.exports = router;
