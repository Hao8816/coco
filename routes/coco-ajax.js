var express = require('express');
var router = express.Router();
var blog = require('../coco_core/blog-impl');
var user = require('../coco_core/user-impl');
var work = require('../coco_core/work-impl');
var search = require('../coco_core/search-impl');
var zlib = require('zlib');
var fs = require('fs');
var gm = require('gm');

var SHA1 = require('sha1')
var JFUM = require('jfum');
var jfum = new JFUM({
    minFileSize: 1,                      // 1kB
    maxFileSize: 5242880,                     // 5 mB
    acceptFileTypes: /\.(gif|jpe?g|png)$/i    // gif, jpg, jpeg, png
});

router.post('/save_blog/', function(req, res) {
    blog.saveBlog(req,res);
});

router.post('/save_topic/', function(req, res) {
    blog.saveTopic(req,res);
});

router.post('/save_comment/', function(req, res) {
    blog.saveComment(req,res);
});

router.post('/get_blog_list/', function(req, res) {
    blog.getBlogList(req,res);
});

router.post('/care_topic',function(req,res){
   blog.careTopic(req,res);
});

router.post('/get_care_list/',function(req,res){
   blog.getTopicCare(req,res);
});

router.post('/get_friend_list/', function(req, res) {
    user.getFriendList(req,res);
});

router.post('/get_topic_list/', function(req, res) {
    blog.getTopicList(req,res);
});

router.post('/search_topic/', function(req, res) {
    search.searchTopic(req,res);
});

router.post('/search_blog/', function(req, res) {
    search.searchBlog(req,res);
});

router.post('/register/',function(req,res){
    user.createUser(req,res);
});

router.post('/login/',function(req,res){
    console.log(req)
    user.loginUser(req,res);
});


router.post('/set_image/',function(req,res){
    user.setUserImage(req,res);
});


router.post('/delete_file/',function(req,res){
    blog.deleteFile(req,res);
});

router.post('/validate_account/',function(req,res){
    user.validateAccount(req,res);
});


router.post('/get_user_info/',function(req,res){
    user.getUserInfo(req,res);
});

router.post('/add_work/',function(req,res){
    work.createWork(req,res);
});

router.post('/get_work_list/',function(req,res){
    work.getWorkList(req,res)
});

router.post('/delete_work/',function(req,res){
    work.deleteWork(req,res)
});



/* 文件上传接口 */
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
                file["content"] = tempFile.toString('base64');
                gm(tempFilePath).resize(300, 300).toBuffer('PNG',function (err, buffer) {
                    if (err) {
                        return handle(err);
                    }
                    file["resize_content"] = buffer;//.toString('base64');
                    blog.saveFile(file)
                })
            }
            res.send(file);
        }
    }
});



module.exports = router;
