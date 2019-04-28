// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// vue.config.js
// 获取mock数据
const mock = require('./mock/index.js');

module.exports = {
    // 选项...
    devServer: {
        before(app) {
            mock(app);
        },
        proxy: {
            '/AssetWeb': {
                // target: 'http://172.16.131.67:8005',
                target: 'http://172.16.131.31:8005', // 测试环境
                // target: 'http://10.192.86.12:8005',

                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': '/static/mock'
                }
            },
            '/ucenter': {
                target: 'http://172.16.131.61:8081',
                ws: true,
                changeOrigin: true,
                pathRewrite: {}
            }
        }
    },
    // configureWebpack: {
    //     plugins: [
    //         new BundleAnalyzerPlugin()
    //     ]
    // }
}
