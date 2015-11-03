var http = require('http');
var SHA1 = require('sha1')
//var redis = require('redis');
//var client = redis.createClient();
// 解决nodejs不支持gbk编码的问题
var iconv = require('iconv-lite');

// 请求Tmall的首页，爬取手机分类
//var pageUrl = ["http://home.meishichina.com/recipe-list.html","http://home.meishichina.com/recipe-list-page-2.html","http://home.meishichina.com/recipe-list-page-3.html"]
var pageUrl = ["http://www.huaue.com/gx01.htm"]


for ( var i = 0;i<pageUrl.length;i++){
    //console.log(url)
    http.get(pageUrl[i],function(res){
        res.on('data',function(data){
            var encoding = res.headers['content-type'];
            console.log(encoding)
            getFoodData(data,encoding);
        }).on('error',function(err){
            console.error('can not get response from tmall');
        })
    }).on('error',function(e){
        console.error('can not request meishichina');
    });
}
function getFoodData(data,encoding){
    var env = require('jsdom').env;
    console.log(data.toString())
    var decode_string = iconv.decode(data,'gb2312');
    // 设置html环境
    env(decode_string.toString(), function (errors, window) {
        try{
            var foodObjList = []
            var $ = require('jquery')(window);
            var food_list = $('#table2').find('td ');
            for (var i=0;i<food_list.length;i++){
                console.log($(food_list[i]).text());
            }


        } catch(e) {
            console.log(e);
        }
    });
}

function cacheFoodObjectList(objList){
    objList.forEach(function(obj){
        var obj_sha1 = obj['sha1']
        client.hset("FOOD_OBJECT_LIST",obj_sha1,JSON.stringify(obj),function(err){
            if(err){
                console.log(err)

            }

        })

    })
    console.log('cache data success')

}
