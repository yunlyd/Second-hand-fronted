const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 2345
  },
  chainWebpack: config =>{
    config.plugin('html')
        .tap(args => {
          args[0].title = "管理系统";
          return args;
        })
  }
})
