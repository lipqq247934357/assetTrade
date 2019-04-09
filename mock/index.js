let product = require('./configM/product/product');
let channel = require('./configM/channel/channel');
let cashProvider = require('./configM/cashProvider/cashProvider');
let splitRules = require('./configM/splitRules/splitRules');
let cashOutput = require('./configM/cashOutput/cashOutput');
let outputDetail = require('./configM/cashOutput/outputDetail');
let privilegeInfo = require('./user/getRoles');

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

    app.post('/mock/service/validate/ticket', function (req, res) {
        res.json(privilegeInfo);
    });

    let prefix = '/mock/asset/pages/config';

    app.post(prefix + '/finProduct/query', function (req, res) {
        res.json(product);
    });

    app.post(prefix + '/channel/query', function (req, res) {
        res.json(channel);
    });
    app.post(prefix + '/channel/update', function (req, res) {
        res.json({
            resultCode: '0000',
            resultMsg: '成功'
        });
    });
    app.post(prefix + '/channel/add', function (req, res) {
        res.json({
            resultCode: '0000',
            resultMsg: '成功'
        });
    });

    app.post(prefix + '/contributive/query', function (req, res) {
        res.json(cashProvider);
    });

    app.post(prefix + '/assetSplit/query', function (req, res) {
        res.json(splitRules);
    });
    app.post(prefix + '/outputTem/query', function (req, res) {
        res.json(cashOutput);
    });

    app.post(prefix + '/outputFile/query', function (req, res) {
        res.json(outputDetail);
    });


    app.post(prefix + '/channel/add', function (req, res) {
        res.json({result: "上传成功"});
    });

    app.post(prefix + '/channel/update', function (req, res) {
        res.json({result: "上传成功"});
    });

    app.post('/mock/flowError', function (req, res) {
        res.json({
                "resultCode": "9000",
                "resultMsg": "业务异常"
            }
        );
    });

    app.post('/mock/systemError', function (req, res) {
        res.json({
                "resultCode": "9999",
                "resultMsg": "系统异常"
            }
        );
    });

}


module.exports = mock;
