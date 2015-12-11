
var redis = require('redis');
var redis_client = redis.createClient();
var logger = require('../coco_core/logger-impl');

var user_models = require('../coco_core/user-models');


user_models.User.all(function(err,result){

    if(err){
        logger.error("get user info error:",err);
    }
    // 遍历所有的用户信息，并缓存起来
    result.forEach(function(obj){
        var user_sha1 = obj.sha1;
        redis_client.hset("USER_INFO_STORE",user_sha1,JSON.stringify(obj),function(err){
            if(err){
                logger.error("cache user info error:",err)
            }
        });
    });
});