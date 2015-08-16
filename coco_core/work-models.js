var orm = require("orm");
var settings = require('../config/db-config');
var db = orm.connect(settings.mysql,function(err,db){
    if (err){
        console.log(err)
        console.log('Can not connect to mysql!');
    }else{
        console.log("Connect sucessfully!");
    }
});

var works_models = {};


// 用户作品信息
var Works = db.define("works", {
    time          : String,    // 作品的上传时间
    sha1          : String,    // 用户的sha1
    note          : String,    // 作品的描述
    file_sha1     : String     // 文件的sha1
}, {
    // with in model method
});


db.sync();

works_models['Works'] = Works;

module.exports = works_models;
