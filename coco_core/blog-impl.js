var blog_models = require('./blog-models');
var user_models = require('./user-models');
var async = require('async');
var search = require('./search-impl');
var logger = require('./logger-impl');
var MongoCache = require('./mongodb-impl');
var SHA1 = require('sha1');
var zlib = require('zlib');

var blog={};
var saveBlog = function saveBlog(req,res){

    var date_time = new Date().getTime();
    var sha1 = SHA1(date_time);
    console.log(req.param)
    var topic_sha1 = req.param('topic_sha1');
    var blog_title = req.param('title')||"";
    var blog_content = req.param('content')||"";
    var creator_sha1 = req.param('creator_sha1');
    var file_list = req.param('file_list')||[];
    blog_models.Blog.create([{
        time          : date_time.toString(),    // 微博创建的时间
        sha1          : sha1,         // blog的sha1
        title         : blog_title,   // 博客标题
        content       : blog_content, // 博客的描述
        images        : file_list,    // 博客的图片信息: Object,
        creator_sha1  : creator_sha1, // 博客的创建者信息
        topic_sha1    : topic_sha1      // 博客的主题
    }],function (err,item){
        console.log(item);
        // 更新主题的信息
        blog_models.Topic.find({ sha1: topic_sha1 }).each(function (topic) {
            var related_sha1s = topic.related
            related_sha1s.push(sha1)
            topic.related = JSON.stringify(related_sha1s);
            topic.update_time = date_time;
        }).save(function (err) {
            // done!
            console.log('update topic update_time success')
        });

        // 更新用户表的数据
        user_models.User.find({ sha1: creator_sha1 }).each(function (user) {
            user.nb_blog = user.nb_blog + 1;
        }).save(function (err) {
            // done!
            console.log('update user nb_blog success')
        });

        // 把新的博客添加到索引库众
        item.forEach(function(obj){
            search.indexBlog(obj);
        });

        res.send({'info':"OK","ret":0001,"blog":item})
    });

    console.log(req)
};

var saveTopic = function saveTopic(req,res){
    var date_time = new Date().getTime();
    var sha1 = SHA1(date_time);
    var topic_title = req.param('title')||"";
    var topic_desc = req.param('desc')||"";
    var type = req.param('type')|| 4;
    var creator_sha1 = req.param('creator_sha1');
    blog_models.Topic.create([{
        time          : date_time.toString(),       // 微博创建的时间
        sha1          : sha1,            // blog的sha1
        title         : topic_title,     // 主题标题
        desc          : topic_desc,      // 主题的描述
        images        : [],              // 博客的图片信息: Object,
        creator_sha1  : creator_sha1,    // 创建者信息
        related       : [],               // 和主题相关的主题
        type          : type              // 和主题大分类

    }],function (err,item){
        console.log(err);
        console.log(item);
        // 更新用户表的数据
        user_models.User.find({ sha1: creator_sha1 }).each(function (user) {
            user.nb_topic = user.nb_topic + 1;
        }).save(function (err) {
            // done!
            console.log('update user nb_topic success')
        });

        // 把新的主题添加到索引库众
        item.forEach(function(obj){
            search.indexTopic(obj);
        });

        res.send({'info':"OK","ret":0001,"topic":item})
    });
};

// 关注主题的信息
var careTopic = function careTopic(req,res){
    var date_time = new Date().getTime();
    var sha1 = SHA1(date_time);
    var topic_sha1 = req.param('topic_sha1')||"";
    var action_type = req.param('action_type')|| 1;
    var user_sha1 = req.param('user_sha1');
    blog_models.TopicAction.create([{
        time          : date_time.toString(),     // 创建的时间
        sha1          : topic_sha1,               // topic的sha1
        user_sha1     : user_sha1,                // 关注着者信息
        action_type   : action_type               // action 类型
    }],function (err,item){
        console.log(err);
        res.send({'info':"OK","ret":0001})
    });
};

// 获取主题的关注列表
var getTopicCare = function getTopicCare(req,res){
    var topic_sha1 = req.param('topic_sha1');
    blog_models.TopicAction.find({sha1:topic_sha1},[ "time", "Z" ]).run(function(err,result){
        if (err){
            logger.error(err);
        }
        var care_list = [];
        // 遍历博客列表，取得博客里面的回复
        async.each(result, function(obj,callback) {
            user_models.User.find({sha1:obj.user_sha1},function(err,results){
                if (err){
                    logger.error(err)
                }
                if (results.length == 1){
                    obj["name"] = results[0].name;
                    obj["head_image"] = results[0].head_image;
                }
                callback()
            });
        }, function(err){
            if( err ) {
                console.log('A file failed to process');
            } else {
                res.send({'info':"OK","ret":0001,"care_list":result})
            }
        });
    });
};


var getBlogList = function getBlogList(req,res){
    var creator_sha1 = req.param('creator_sha1');
    var topic_sha1 = req.param('topic_sha1');
    var page = req.param('page')-1;
    console.log(page);
    // 查询主题对应的博客
    if(topic_sha1 == 0){
        blog_models.Blog.find([ "time", "Z" ]).limit(20).offset(20*page).run(function(err,result){
            if(err){
                console.log(err);
            }
            var has_next = true;
            if(result.length<10){
                has_next = false;
            }
            // 遍历博客列表，取得博客里面的回复
            async.each(result, function(obj,callback) {
                blog_models.Comment.find({blog_sha1:obj.sha1},[ "time", "Z" ],function(err,results){
                    obj['comment_list'] = results || [];
                    callback()
                });
            }, function(err){
                if( err ) {
                    console.log('A file failed to process');
                } else {
                    logger.error("blog_result:",result)
                    res.send({'info':"OK","ret":0001,"blog_list":result,"has_next":has_next})
                }
            });
            res.send({'info':"OK","ret":0001,"blog_list":result,"has_next":has_next})
        });
    }else{
        blog_models.Blog.find({topic_sha1:topic_sha1},[ "time", "Z" ]).limit(20).offset(20*page).run(function(err,result){
            if(err){
                console.log(err);
            }
            var has_next = true;
            if(result.length<10){
                has_next = false;
            }
            // 遍历博客列表，取得博客里面的回复
            async.each(result, function(obj,callback) {
                blog_models.Comment.find({blog_sha1:obj.sha1},[ "time", "Z" ],function(err,results){
                    obj['comment_list'] = results || [];
                    callback()
                });
            }, function(err){
                if( err ) {
                    console.log('A file failed to process');
                } else {
                    logger.error("blog_result:",result)
                    res.send({'info':"OK","ret":0001,"blog_list":result,"has_next":has_next})
                }
            });
        });
    }
};

var getTopicList = function getTopicList(req,res){
    var creator_sha1 = req.param('creator_sha1');
    console.log(creator_sha1);
    var page = req.param('page') || 1;
    var type = req.param('type') || -1;
    var pageSize = 12;
    if(page == 1){
        pageSize = 11;
    }
    var query = {};
    if (type != -1){
        query = {"type":type}
    }

    blog_models.Topic.find(query,[ "time", "Z" ]).limit(pageSize).offset(pageSize*(page-1)).run(function(err,result){
        if(err){
            console.log(err);
        }
        var has_next = true;
        if(result.length<10){
            has_next = false;
        }
        res.send({'info':"OK","ret":0001,"topic_list":result,"has_next":has_next})

    });
};


var deleteFile = function deleteFile(req,res){
    var file_sha1 = req.param('file_sha1');
    var usersha1 = req.param('usersha1');
    blog_models.File.find({"sha1":file_sha1}).remove(function(err){
        if(err){
            console.log(err);
        }
        res.send({'info':"OK","ret":0001})
    });
};

// 获取原图内容
var getOriginFile = function getOriginFile(req,res){
    var file_sha1 = req.param('sha1');
    var usersha1 = req.param('usersha1');

    // 从Mongodb中获取文件内容
    MongoCache.getFile(req,res);
};

// 获取缩略图
var getFile = function getFile(req,res){
    var file_sha1 = req.param('sha1');
    console.log(file_sha1)
    blog_models.File.find({"sha1":file_sha1}).run(function(err,result){
        if(err){
            console.log(err);
        }
        if (result.length==1){
            var file_content = result[0].content;
            var file_name = result[0].name;
            var type_array = file_name.split(".");
            var file_type = type_array[type_array.length - 1];
            res.writeHead(200, {'Content-type' : 'image/png'});
            var file_buffer = new Buffer(file_content);
            res.write(file_buffer);
            res.end();

        }else{
            res.write('Can not find file');
            res.end();
        }
    });
};


var saveFile = function saveFile(obj){
    var date_time = new Date().getTime();
    // 将文件内容保存在mongodb
    MongoCache.saveFile({sha1:obj.sha1,content:obj.content});
    // 将文件信息持久化到数据库
    blog_models.File.create([{
        time          : date_time.toString(),    // 微博创建的时间
        sha1          : obj['sha1'],    // blog的sha1
        name          : obj['name'],    // 文件名称
        size          : obj['size'],    // 文件的大小
        type          : obj['mime'],    // 文件类型
        path          : obj['path'],    // 文件的存储路径
        creator_sha1  : "",             // 创建者信息
        blog_sha1     : "",             // 文件所属的博客的sha1
        content       : obj['resize_content']    //文件缩略图的内容

    }],function (err,item){
        console.log(err);

        //res.send({'info':"OK","ret":0001})
    });
};

var saveComment = function saveComment(req,res){
    var parent_sha1 = req.param('parent_sha1')||"";
    var images = req.param('file_list');
    var blog_sha1 = req.param('blog_sha1');
    var creator_sha1 = req.param('creator_sha1');
    var content = req.param('content')||"";
    var date_time = new Date().getTime();
    var sha1 = SHA1(date_time+creator_sha1);
    blog_models.Comment.create([{
        time          : date_time.toString(),    // 微博创建的时间
        sha1          : sha1,                    // blog的sha1
        content       : content,                 // 博客的内容
        images        : images,                  // 博客的图片信息: Object,
        creator_sha1  : creator_sha1,            // 博客的创建者信息
        blog_sha1     : blog_sha1,               // 博客的所属的主题
        parent_sha1   : parent_sha1              // 博客的父节点的sha1

    }],function (err,item){
        console.log(err);
        console.log(item);
        // 把新的评论添加到索引库众
        item.forEach(function(obj){
            search.indexComment(obj);
        });

        res.send({'info':"OK","ret":0001,"comment":item})
    });
};

var getBlogCommentList = function getBlogCommentList(req,res){
    var blog_sha1 = req.param('blog_sha1');
    blog_models.Comment.find({blog_sha1:blog_sha1},[ "time", "Z" ]).run(function(err,result){
        if(err){
            console.log(err);
        }
        res.send({'info':"OK","ret":0001,"topic_list":result})

    });
};


blog.saveBlog = saveBlog;
blog.careTopic = careTopic;
blog.getTopicCare = getTopicCare;
blog.saveTopic = saveTopic;
blog.getBlogList = getBlogList;
blog.getTopicList = getTopicList;
blog.saveFile = saveFile;
blog.getFile = getFile;
blog.getOriginFile = getOriginFile;
blog.deleteFile = deleteFile;
blog.saveComment = saveComment;
blog.getBlogCommentList = getBlogCommentList;

module.exports = blog;


