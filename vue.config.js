module.exports = {
  productionSourceMap: false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      // 如果请求路径中出现了api，就代理转发这次请求
      '/api': {
        // 请求的数据来自于这个服务器
        // target: 'http://39.98.123.211',
        target: 'http://gmall-h5-api.atguigu.cn'
      },
    },
  },

};




