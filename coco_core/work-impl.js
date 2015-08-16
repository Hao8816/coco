var work_models = require('./work-models');
var SHA1 = require('sha1');
var async = require('async');
var orm = require("orm");
var settings = require('../config/db-config');
var redis = require('redis');
var redis_client = redis.createClient();

var logger = require('./logger-impl');


var db = orm.connect(settings.mysql,function(err,db){
    if (err){
        console.log(err)
        console.log('Can not connect to mysql!');
    }else{
        console.log("Connect sucessfully!");
    }
});
var work={};
var createWork = function createWork(req,res){
    var date_time = new Date().getTime();
    var user_sha1 = req.param('user_sha1');
    var file_sha1 = req.param('file_sha1');
    var note = req.param('note');
    work_models.Works.create([{
        time          : date_time,    // 用户注册的创建的时间
        user_sha1     : user_sha1,         // 用户的sha1
        note          : note,         // 用户名
        file_sha1     : file_sha1      // 密码
    }],function (err,item){

    });
    res.send({'info':"OK","ret":0001})
    console.log(req)
};


var getWorkList = function getWorkList(req,res){

    // get work list from redis
    work_models.Works.all([ "time", "Z" ],function(err,result){
        if(err){
            console.log(err);
        }
        res.send({'info':"OK","ret":0001,"work_list":result})

    });

};

var deleteWork = function deleteWork(req,res){
    var file_sha1 = req.param('file_sha1');
    var user_sha1 = req.param('user_sha1');
    work_models.Works.find({"file_sha1":file_sha1}).remove(function(err){
        if(err){
            console.log(err);
        }
        res.send({'info':"OK","ret":0001})

    });
};



work.createWork = createWork;
work.getWorkList = getWorkList;
work.deleteWork = deleteWork;

module.exports = work;


