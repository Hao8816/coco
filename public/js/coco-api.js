
var api_data = [
    {
        "name": "用户登录",
        "desc": "用户登录接口,后端检查用户名和密码是否匹配,用户登录成功之后，返回用户的详细信息",
        "url": "http://onekoko.com:3000/api/",
        "method": "post",
        "params": {
            "action":"login",
            "name":"chenhao",
            "password_app":"xxxx"
        },
        "response": {
            "ret": '0001',
            "info": 'ok',
            "data": {
                'name': 'user.name',
                'sha1': 'user.sha1',
                'type': 'user.type',
                'password': 'user.password',
                'time': 'str(user.time)'
            }
        },
        "note": {
            "ret":'状态信息，0001表示一切正常。状态信息列表参考ret list',
            'name': '用户名',
            'sha1': '用户sha1',
            'passwortd': '用户密码',
            'time': 'string格式化的时间字符串',
            'info': '返回状态信息'
        }
    },
    {
        "name": "主题列表",
        "desc": "用户登录之后获取所有的主题信息",
        "url": "http://onekoko.com:3000/api/",
        "method": "post",
        "params": {
            "action":"index",
            "creator_sha1":"0",
            "page":"1"
        },
        "response": {
            "info":"OK",
            "ret":0001,
            "topic_list":[{
                "creator_sha1" : "d44af656b5aa0db14b91a7557744e3cf9d67f8fd",
                "desc" : "\U600e\U4e48\U4e0d\U80fd\U4e3b\U52a8\U7d22\U5f15",
                "id" : "39",
                "images" :[],
                "related" :  [],
                "sha1" : "d395495059299da0ef63d57c094728f06b5911d3",
                "time" : 1431263302667,
                "title" : "\U6d4b\U8bd5\U7d22\U5f15",
                "update_time" : "<null>"
                }],
            "has_next":"false"
        },
        "note": {
            "ret":'状态信息，0001表示一切正常。状态信息列表参考ret list',
            "creator_sha1" : "主题创建者的sha1",
            "desc" : "主题的描述信息",
            "id" : "主题的id",
            "images" :"主题的图像信息",
            "related" :  "主题相关的博客sha1列表",
            "sha1" : "主题的sha1",
            "time" : "主题创建的时间",
            "title" : "主题title",
            "update_time" : "主题的最后更新时间",
            'info': '返回状态信息'
        }
    },
    {
        "name": "博客列表",
        "desc": "用户登录之后获取所有的主题信息",
        "url": "http://onekoko.com:3000/api/",
        "method": "post",
        "params": {
            "action":"blog",
            "creator_sha1":"",
            "topic_sha1":"0",
            "page":"1"
        },
        "response": {
            "info":"OK",
            "ret":0001,
            "blog_list":[{
                "blog_sha1" : "031f006cc9cf8b62fc2a2cbe936cf4d89abc3f51",
                "content" : "\U6d4b\U8bd5\U6211\U7684\U8bc4\U8bba",
                "creator_sha1" : "<null>",
                "id" : 6,
                "images" : [],
                "parent_sha1" : "",
                "sha1" : "29e2dcfbb16f63bb0254df7585a15bb6fb5e927d",
                "time" : 1431881851734
            }],
            "has_next":"true"
        },
        "note": {
            "ret":'状态信息，0001表示一切正常。状态信息列表参考ret list',
            "blog_sha1" : "博客的hash值",
            "content" : "博客的内容",
            "creator_sha1" : "博客的创建者",
            "id" : "博客ID",
            "images" : "博客的图片信息",
            "parent_sha1" : "",
            "sha1" : "29e2dcfbb16f63bb0254df7585a15bb6fb5e927d",
            "time" : "博客创建的时间戳",
            'info': '返回状态信息'
        }
    },
    {
        "name": "好友列表",
        "desc": "用户登录之后获取所有的主题信息",
        "url": "http://onekoko.com:3000/api/",
        "method": "post",
        "params": {
            "action":"user_list",
            "user_sha1":"0"
        },
        "response": {
            "info":"OK",
            "ret":0001,
            "friend_list":[{
                "email":"873748777@qq.com",
                "first_name" : "",
                "head_image" : "",
                "id" : 50,
                "last_name" : "",
                "location" : "",
                "name" : "\U9648\U529b",
                "nb_blog" : 0,
                "nb_friend" : 0,
                "nb_topic" : 0,
                "online" : 0,
                "password" : "ed96dfeeefe5aaf7711a5f102a721a9de155e68f",
                "phone" : "18842904299",
                "sha1":"2020f39039d1af31546f0a3313c0ba2bd18d8602",
                "status":0,
                "time" :"1432905549930"
            }]
        },
        "note": {
            "ret":'状态信息，0001表示一切正常。状态信息列表参考ret list',
            "email":"邮箱地址",
            "first_name" : "姓",
            "head_image" : "图像sha1",
            "id" : 50,
            "last_name" : "名",
            "location" : "位置信息",
            "name" : "用户名",
            "nb_blog" : "博客数量",
            "nb_friend" : "好友数量",
            "nb_topic" : "主题数量",
            "online" : "在线状态",
            "phone" : "好友的电话",
            "sha1":"好友的sha1",
            "status":"账号状态 0是未激活，1已激活",
            "time" :"好友注册时间戳",
            'info': '返回状态信息'
        }
    },
    {
        "name": "主题搜索",
        "desc": "用户登录之后获取所有的主题信息",
        "url": "http://onekoko.com:3000/api/",
        "method": "post",
        "params": {
            "action":"search_topic",
            "keyword":"测试",
            "page":"1"
        },
        "response": {
            "info":"OK",
            "ret":0001,
            "topic_list":[{
                    "creator_sha1" : "208e3cbced6f0ae48ee0e7156441ec655fb494d7",
                    "desc" : "test",
                    "id" : 15,
                    "images" : [],
                    "related" :["a4864129c83174f74f066f96fe1a8ec785621a97"],
                    "sha1" : "c84dff1bdc9de0cfa38a36836389882ddb35b650",
                    "time" : "1427687561824",
                    "title" : "chenhao",
                    "update_time" : "1428839815384"
            }]
        },
        "note": {
            "ret":'状态信息，0001表示一切正常。状态信息列表参考ret list',
            "creator_sha1" : "主题创建者的sha1",
            "desc" : "主题的描述信息",
            "id" : "主题的id",
            "images" :"主题的图像信息",
            "related" :  "主题相关的博客sha1列表",
            "sha1" : "主题的sha1",
            "time" : "主题创建的时间",
            "title" : "主题title",
            "update_time" : "主题的最后更新时间",
            'info': '返回状态信息'
        }
    },
    {
        "name": "博客搜索",
        "desc": "用户登录之后获取所有的主题信息",
        "url": "http://onekoko.com:3000/api/",
        "method": "post",
        "params": {
            "action":"search_blog",
            "keyword":"测试",
            "page":"1"
        },
        "response": {
            "info":"OK",
            "ret":0001,
            "blog_list":[{
                "blog_sha1" : "031f006cc9cf8b62fc2a2cbe936cf4d89abc3f51",
                "content" : "\U6d4b\U8bd5\U6211\U7684\U8bc4\U8bba",
                "creator_sha1" : "<null>",
                "id" : 6,
                "images" : [],
                "parent_sha1" : "",
                "sha1" : "29e2dcfbb16f63bb0254df7585a15bb6fb5e927d",
                "time" : 1431881851734
            }]
        },
        "note": {
            "ret":'状态信息，0001表示一切正常。状态信息列表参考ret list',
            "blog_sha1" : "博客的hash值",
            "content" : "博客的内容",
            "creator_sha1" : "博客的创建者",
            "id" : "博客ID",
            "images" : "博客的图片信息",
            "parent_sha1" : "",
            "sha1" : "29e2dcfbb16f63bb0254df7585a15bb6fb5e927d",
            "time" : "博客创建的时间戳",
            'info': '返回状态信息'
        }
    }
];
