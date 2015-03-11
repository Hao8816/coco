var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

/* GET home page. */
router.get('/', function(req, res) {
    var params = req.param('data')
    console.log(params)
    res.render('coco-chat.ejs', { title: 'COCO Chat' });
});

router.post('/', function(req, res) {
    // api 里面的参数传递在body里面
    var rsdic = {}
    var params = req.body
    if (params.hasOwnProperty('action') == false){
        rsdic['info'] = "params error"
        rsdic['ret'] = '0001'
        res.send(rsdic)
    }
    var action = params['action']
    console.log(params)
    client.hvals('FOOD_OBJECT_LIST',function(err,result){
        if (err){
            console.log('Get Value By Key Error'+err);
        }
        console.log('----read from redis ----');
        var json_data = result.map(function(obj){
            return JSON.parse(obj)
        })
        console.log(result)
        rsdic['data'] = json_data.slice(0,10)
        rsdic['action'] = action
        rsdic['info'] = "ok"
        rsdic['ret'] = '0000'
        res.send(rsdic)
    })
});

var apiURL = {
    "index" : "",
    "share" : ""
}

function apiRoute(){


}

module.exports = router;
