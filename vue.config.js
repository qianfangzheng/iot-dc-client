module.exports = {
    publicPath: './',
    lintOnSave: true,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/user_api': {
                target: 'http://dc3-auth:8300',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/user_api': ''
                }
            },
            '/manager_api': {
                target: 'http://dc3-manager:8400',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/manager_api': ''
                }
            },
            '/data_api': {
                target: 'http://dc3-data:8500',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/data_api': ''
                }
            }
        }
    }
};
