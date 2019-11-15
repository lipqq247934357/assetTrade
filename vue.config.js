// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// vue.config.js
// 获取mock数据
// const mock = require('./mock/index.js');

module.exports = {
    // 选项...
    publicPath: process.env.NODE_ENV === 'production'
        ? '/assettrade/'
        : '/',
    devServer: {
        // before(app) {
        //     mock(app);
        // },
        proxy: {
            '/AssetWeb': { //资产管理系统
                target: 'http://172.16.131.31:7100', // 本地1
                // target: 'http://172.16.131.31:8005', // 测试环境
                ws: true,
                changeOrigin: true
            },
            '/batch-xc': { //还款管理系统
                // target: 'http://10.89.2.119:7205', // 本地1
                target: 'http://172.16.131.31:8000', // 测试环境
                ws: true,
                changeOrigin: true
            },
            '/batch-guar': { //担保代偿系统
                // target: 'http://10.89.2.119:7290', // 本地1
                target: 'http://172.16.131.31:7290', // 测试环境
                ws: true,
                pathRewrite: {
                    '^/batch-guar': ''
                },
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
