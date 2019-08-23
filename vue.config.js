// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// vue.config.js
// 获取mock数据
// const mock = require('./mock/index.js');

module.exports = {
    // 选项...
    devServer: {
        // before(app) {
        //     mock(app);
        // },
        proxy: {
            '/AssetWeb': { //资产管理系统
                // target: 'http://172.16.131.31:8005', // 本地1
                target: 'http://172.16.131.31:8005', // 测试环境
                ws: true,
                changeOrigin: true
            },
            '/batch-xc': { //还款管理系统
                // target: 'http://10.89.2.119:7205', // 本地1
                target: 'http://172.16.131.31:8000', // 测试环境
                ws: true,
                changeOrigin: true
            },
            '/ucenter': { // 用户中心
                target: 'http://172.16.131.61:8081',
                ws: true,
                changeOrigin: true,
            }
        }
    },
    // configureWebpack: {
    //     plugins: [
    //         new BundleAnalyzerPlugin()
    //     ]
    // }
}
