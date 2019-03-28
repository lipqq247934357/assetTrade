let channel = require('./configM/channel/channel');

function mock(app) {
    /**
     * 用户名
     * 姓名
     * 权限名
     * 头像地址
     * 个人介绍
     * 手机号
     * 邮箱
     * 职位
     */
    app.post('/mock/userInfo', function (req, res) {
        res.json({
            username: "lipeng",
            name: "lipeng",
            rolesName: "管理员",
            iconAddress: "/icon/touxiang.jpg",
            desc: "一帆风顺",
            phone: "1xx",
            email: "2xx",
            job: "前端开发工程师",
        });
    });
    app.post('/mock/login', function (req, res) {
        res.json({
            roles: "simple",
            token: '1234'
        });
    });
    app.post('/mock/getRoles', function (req, res) {
        res.json({
            roles: "simple",
            name: "lipeng",
            avatar: ""
        });
    });

    app.post('/mock/channel', function (req, res) {
        res.json(channel);
    });

    app.post('/mock/addChannel', function (req, res) {
        res.json({result:"上传成功"});
    });
}

module.exports = mock;
