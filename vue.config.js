// 配置反向代理服务器
module.exports = {
    baseUrl: '/',
    devServer: {
        proxy: {
            '/': {
                target: 'http://www.jq-kq.com',
                changeOrigin: true,
                ws: true,
            }
        }
    }
}