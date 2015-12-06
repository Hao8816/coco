// mongoose 链接
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:8085/coco');

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
}

// model
var mongooseModel = db.model('mongoose', fileSchema);

// 增加记录 基于 entity 操作
var doc = {sha1 : '123', content : 'emtity_demo_content'};
var mongooseEntity = new mongooseModel(doc);
mongooseEntity.save(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('saved OK!');
    }
    // 关闭数据库链接
   // db.close();
});

// 增加记录 基于model操作
var doc = {sha1 : '124', content : 'model_demo_content'};
mongooseModel.create(doc, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('save ok');
    }
    // 关闭数据库链接
    db.close();
});

// 基于静态方法的查询
mongooseModel.findbysha1('emtity_demo_title', function(error, result){
    if(error) {
        console.log(error);
    } else {
        console.log(result);
    }
    //关闭数据库链接
    db.close();
});

// 删除记录
var conditions = {username: 'emtity_demo_username'};
mongooseModel.remove(conditions, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('delete ok!');
    }

    //关闭数据库链接
    db.close();
});