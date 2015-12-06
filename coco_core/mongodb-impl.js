// mongoose 链接
var async = require('async');
var mongoose = require('mongoose');
var MongoCache = {}

var db = mongoose.createConnection('mongodb://127.0.0.1:8085/coco');

// TODO "添加连接管理的功能，自动连接的功能"

// 链接错误
db.on('error', function(error) {
    console.log(error);
});

// Schema 结构
var fileSchema = new mongoose.Schema({
    sha1     : {type : String},
    content  : {type : String}
});

// 添加 mongoose 静态方法，静态方法在Model层就能使用
fileSchema.statics.findbysha1 = function(sha1, callback) {
    return this.model('mongoose').find({sha1: sha1}, callback);
};

// model
var mongooseModel = db.model('mongoose', fileSchema);

// 根据sha1查询
var getFile = function getFile(req,res){
    var file_sha1 = req.param('sha1');
    // 基于静态方法的查询
    mongooseModel.findbysha1(file_sha1, function(err, result){
        if(err) {
            console.log(err);
        } else {
            var file_content = result[0].content;
            var type_array = file_sha1.split(".");
            var file_type = type_array[type_array.length - 1];
            res.writeHead(200, {'Content-type' : 'image/'+file_type});
            var file_buffer = new Buffer(file_content,'base64')
            res.write(file_buffer);
            res.end();
        }
        //关闭数据库链接
        //db.close();
    });
};

// 保存文件内容
var saveFile = function saveFile(obj){
    var doc = {sha1 : obj.sha1, content : obj.content};
    mongooseModel.create(doc, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('save ok');
        }
        // 关闭数据库链接
        //db.close();
    });
};

// 删除文件内容
var deleteFile = function deleteFile(sha1){
    var conditions = {sha1: sha1};
    mongooseModel.remove(conditions, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('delete ok!');
        }
        //关闭数据库链接
        //db.close();
    });
};


MongoCache["saveFile"] = saveFile;
MongoCache["getFile"] = getFile;
MongoCache["deleteFile"] = deleteFile;

module.exports = MongoCache;