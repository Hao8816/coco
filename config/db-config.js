var settings = {}
var mysql_settings = {
    //host     : "106.185.27.152",
    host     : "onekoko.com",
    database : "coco",
    user     : "chenhao",
    password : "chenhao",
    protocol : "mysql",
    //socketPath: '/var/run/mysqld/mysqld.sock',
    port     : "3305"
};

var redis_settings = {

};



// 添加到settings的里面
settings['mysql'] = mysql_settings;
settings['redis'] = redis_settings;

module.exports = settings;