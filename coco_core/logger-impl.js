// 配置log的信息
var log4js = require('log4js');
var colors = require('colors');
log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: 'message_server.log',
            maxLogSize: 20480,
            backups:4,
            category: 'app'
        }
    ],
    replaceConsole: true
});

var logger = log4js.getLogger('app');

// 设置不同类型的log的颜色
colors.setTheme({
    silly: 'rainbow',
    debug: 'cyan',
    info: 'green',
    data: 'grey',
    warn: 'yellow',
    trace: 'blue',
    error: 'red'
});

module.exports = logger;