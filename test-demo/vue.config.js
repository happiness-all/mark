const { defineConfig } = require('@vue/cli-service')

const BASEURL = 'http://10.29.204.225';

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/auth/who': {
        target: BASEURL,
        secure: false,
        changeOrigin: true,
      },
      '/custom/guizhou': {
        target: BASEURL,
        secure: false,
        changeOrigin: true,
      },
    },
  }
})
