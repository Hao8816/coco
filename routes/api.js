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
    console.log(params)
    var action = req.param('action');

    if (action == undefined){
        rsdic['info'] = "params error"
        rsdic['ret'] = '0001'
        res.send(rsdic)
    }
    if(action == 'index'){
        blog.getTopicList(req,res);
    }else if(action == 'blog'){
        blog.getBlogList(req,res);
    }

    //apiRouter[action]()(req,res)
});

var apiRouter = {
    "index" : "getBlogList",
    "share" : ""
};

function getBlogList(req,res){
    console.log('this is a function -----');
    blog.getTopicList(req,res);
}

module.exports = router;
