var blog_models = require('./blog-models');
var user_models = require('./user-models');

var SHA1 = require('sha1');

var blog={};
var saveBlog = function saveBlog(req,res){

    var date_time = new Date().getTime();
    var sha1 = SHA1(date_time);
    console.log(req.param)
    var topic_sha1 = req.param('topic_sha1');
    var blog_title = req.param('title');
    var blog_content = req.param('content');
    var creator_sha1 = req.param('creator_sha1');
    blog_models.Blog.create([{
        time          : date_time,    // 微博创建的时间
        sha1          : sha1,    // blog的sha1
        title         : blog_title,    // 博客标题
        content       : blog_content,    // 博客的描述
        images        : [],    // 博客的图片信息: Object,
        creator_sha1  : creator_sha1,   // 博客的创建者信息
        topic_sha1  : topic_sha1   // 博客的主题
    }],function (err,item){
        console.log(item);
        // 更新用户表的数据
        user_models.User.find({ sha1: creator_sha1 }).each(function (user) {
            user.nb_blog = user.nb_blog + 1;
        }).save(function (err) {
            // done!
            console.log('update user nb_blog success')
        });
        res.send({'info':"OK","ret":0001,"blog":item})
    });

    console.log(req)
};

var saveTopic = function saveTopic(req,res){
    var date_time = new Date().getTime();
    var sha1 = SHA1(date_time);
    var topic_title = req.param('title');
    var topic_desc = req.param('desc');
    var creator_sha1 = req.param('creator_sha1');
    blog_models.Topic.create([{
        time          : date_time,       // 微博创建的时间
        sha1          : sha1,            // blog的sha1
        title         : topic_title,     // 主题标题
        desc          : topic_desc,      // 主题的描述
        images        : [],              // 博客的图片信息: Object,
        creator_sha1  : creator_sha1,    // 创建者信息
        related       : []               // 和主题相关的主题

    }],function (err,item){
        console.log(err);
        // 更新用户表的数据
        user_models.User.find({ sha1: creator_sha1 }).each(function (user) {
            user.nb_topic = user.nb_topic + 1;
        }).save(function (err) {
            // done!
            console.log('update user nb_topic success')
        });
        res.send({'info':"OK","ret":0001,"topic":item})
    });
};

var getBlogList = function getBlogList(req,res){
    var creator_sha1 = req.param('creator_sha1');
    var topic_sha1 = req.param('topic_sha1');
    var page = req.param('page')-1;
    console.log(page)
    // 查询主题对应的博客
    if(topic_sha1 == 0){
        blog_models.Blog.find([ "time", "Z" ]).limit(10).offset(10*page).run(function(err,result){
            if(err){
                console.log(err);
            }

            res.send({'info':"OK","ret":0001,"blog_list":result})
        });
    }else{
        blog_models.Blog.find({topic_sha1:topic_sha1},[ "time", "Z" ]).limit(10).offset(10*page).run(function(err,result){
            if(err){
                console.log(err);
            }

            res.send({'info':"OK","ret":0001,"blog_list":result})
        });
    }

};

var getTopicList = function getTopicList(req,res){
    var creator_sha1 = req.param('creator_sha1');
    console.log(creator_sha1)
    blog_models.Topic.find([ "time", "Z" ]).run(function(err,result){
        if(err){
            console.log(err);
        }
        res.send({'info':"OK","ret":0001,"topic_list":result})

    });
};


var deleteFile = function deleteFile(req,res){
    var file_sha1 = req.param('file_sha1');
    var usersha1 = req.param('usersha1');
    blog_models.File.find({"sha1":file_sha1}).run(function(err,result){
        if(err){
            console.log(err);
        }
        res.send({'info':"OK","ret":0001,"topic_list":result})

    });
};

var saveFile = function saveFile(obj){
    var date_time = new Date().getTime();
    blog_models.File.create([{
        time          : date_time,    // 微博创建的时间
        sha1          : obj['sha1'],    // blog的sha1
        name          : obj['name'],    // 文件名称
        size          : obj['size'],    // 文件的大小
        type          : obj['mime'],    // 文件类型
        path          : obj['path'],    // 文件的存储路径
        creator_sha1  : "",    // 创建者信息
        blog_sha1     : ""     // 文件所属的博客的sha1

    }],function (err,item){
        console.log(err);

        //res.send({'info':"OK","ret":0001})
    });
};



blog.saveBlog = saveBlog;
blog.saveTopic = saveTopic;
blog.getBlogList = getBlogList;
blog.getTopicList = getTopicList;
blog.saveFile = saveFile;
blog.deleteFile = deleteFile;

module.exports = blog


