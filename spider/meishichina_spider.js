var http = require('http');
var SHA1 = require('sha1')
//var redis = require('redis');
//var client = redis.createClient();
// 解决nodejs不支持gbk编码的问题
var iconv = require('iconv-lite');

// 请求Tmall的首页，爬取手机分类
//var pageUrl = ["http://home.meishichina.com/recipe-list.html","http://home.meishichina.com/recipe-list-page-2.html","http://home.meishichina.com/recipe-list-page-3.html"]
var pageUrl = ["http://www.china-10.com/china/888cany_index.html"]


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
    var decode_string = iconv.decode(data,'UTF8');
    // 设置html环境
    env(decode_string.toString(), function (errors, window) {
        try{
            var foodObjList = []
            var $ = require('jquery')(window);
            var food_list = $('.blist').find('ul li a');
            for (var i=0;i<food_list.length;i++){
                console.log($(food_list[i]).text());
            }
 //for (var i=0;i<food_list.length;i++){
            //    var dic = {}
            //    var foodObj = $(food_list[i]);
            //    var foodImageUrl = foodObj.find('.pic a img').attr('data-src')
            //    var foodName = foodObj.find('.pic a').attr('title')
            //    var foodUrl = foodObj.find('.pic a').attr('href')
            //    var foodDetail = foodObj.find('.detail .subcontent').text()
            //    var foodSha1 = SHA1(foodUrl)
            //
            //    dic['name'] = foodName
            //    dic['sha1'] = foodSha1
            //    dic['url'] = foodUrl
            //    dic['image_url'] = foodImageUrl
            //    dic['detail'] = foodDetail
            //    foodObjList.push(dic)
            //    //cacheFoodObjectList(foodObjList)
            //}

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
