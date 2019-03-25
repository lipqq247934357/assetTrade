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
            '/api': {
                target: 'http://39.105.185.89',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/static/mock'
                }
            }
        }
    }
}
