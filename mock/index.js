let product = require('./configM/product/product');
let channel = require('./configM/channel/channel');
let cashProvider = require('./configM/cashProvider/cashProvider');
let splitRules = require('./configM/splitRules/splitRules');
let cashOutput = require('./configM/cashOutput/cashOutput');
let outputDetail = require('./configM/cashOutput/outputDetail/outputDetail');
let privilegeInfo = require('./user/getRoles');

let assetList = require('./assetM/asset/assetList');
let assetDetail = require('./assetM/asset/assetDetail');
let creditList = require('./assetM/credit/creditList');
let creditDetail = require('./assetM/credit/creditDetail');
let customerList = require('./assetM/customer/customerList');
let customerDetail = require('./assetM/customer/customerDetail');


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

    app.post('/mock/ucenter/service/validate/ticket', function (req, res) {
        res.json(privilegeInfo);
    });

    let prefix = '/mock/AssetWeb/asset/pages/config';

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


    let prefix2 = '/mock/AssetWeb/list';

    app.post(prefix2 + '/queryAssetList', function (req, res) {
        res.json(assetList);
    });
    app.post(prefix2 + '/queryAssetDetail', function (req, res) {
        res.json(assetDetail);
    });
    app.post(prefix2 + '/queryCustomerInfoList', function (req, res) {
        res.json(customerList);
    });
    app.post(prefix2 + '/queryCustomerInfoDetail', function (req, res) {
        res.json(customerDetail);
    });
    app.post(prefix2 + '/queryApplyCreditist', function (req, res) {
        res.json(creditList);
    });
    app.post(prefix2 + '/queryApplyCreditInfoDetail', function (req, res) {
        res.json(creditDetail);
    });

}


module.exports = mock;
