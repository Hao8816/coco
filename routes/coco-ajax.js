var express = require('express');
var router = express.Router();
var blog = require('../coco_core/blog-impl');
var user = require('../coco_core/user-impl');

var fs = require('fs');
var SHA1 = require('sha1')
var JFUM = require('jfum');
var jfum = new JFUM({
    minFileSize: 20,                      // 200 kB
    maxFileSize: 5242880,                     // 5 mB
    acceptFileTypes: /\.(gif|jpe?g|png)$/i    // gif, jpg, jpeg, png
});

router.post('/save_blog/', function(req, res) {
    blog.saveBlog(req,res);
});

router.post('/save_topic/', function(req, res) {
    blog.saveTopic(req,res);
});

router.post('/get_blog_list/', function(req, res) {
    blog.getBlogList(req,res);
});

router.post('/get_friend_list/', function(req, res) {
    user.getFriendList(req,res);
});

router.post('/get_topic_list/', function(req, res) {
    console.log(req.param('creator_sha1'))
    blog.getTopicList(req,res);
});


router.post('/register/',function(req,res){
    user.createUser(req,res);
});

router.post('/login/',function(req,res){
    user.loginUser(req,res);
});


router.post('/set_image/',function(req,res){
    user.setUserImage(req,res);
});



/* GET home page. */
router.post('/upload/',jfum.postHandler.bind(jfum),function(req, res) {
    //console.log(req.jfum.files)
    // Check if upload failed or was aborted
    if (req.jfum.error) {
        // req.jfum.error
        console.log(req.jfum.error)

    } else {
        // Here are the uploaded files
        for (var i = 0; i < req.jfum.files.length; i++) {
            var file = req.jfum.files[i];
            // 读取文件，写到本地
            // Check if file has errors
            if (file.errors.length > 0) {
                for (var j = 0; i < file.errors.length; i++) {
                    // file.errors[j].code
                    // file.errors[j].message
                }

            } else {
                var tempFilePath = file.path;
                var fileName = file.name;
                var tempFile = fs.readFileSync(tempFilePath)
                var fileSha1 = SHA1(tempFilePath);
                console.log(tempFile)
                var typeArray = fileName.split(".");
                var fileType = typeArray[typeArray.length - 1]
                var sha1 = fileSha1+"."+fileType
                file['sha1'] = sha1
                fs.writeFileSync("public/images/"+sha1,tempFile)
                //fs.renameSync(tempFilePath,"/"+fileName)
                // file.field - form field name
                // file.path - full path to file on disk
                // file.name - original file name
                // file.size - file size on disk
                // file.mime - file mime type
            }
            console.log(file)
            res.send(file);
        }
    }

});





module.exports = router;
