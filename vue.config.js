module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    devtool: 'source-map'
  },
  outputDir: '../static/dist',
  devServer: {
    port: 8090,
    proxy: {
      '/api': {
        target: 'http://172.28.20.7:8080',
        changeOrigin: true
      }
    }
  }
};
