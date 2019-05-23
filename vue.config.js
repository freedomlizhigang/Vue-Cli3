// 配置反向代理服务器
module.exports = {
    publicPath: './',
    outputDir: '../www',
    assetsDir: './',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api/': {
    //             target: 'http://jqdc.137idea.com:8089',
    //             changeOrigin: true,
    //             ws: true,
    //         }
    //     }
    // }
}
