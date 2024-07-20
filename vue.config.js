const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    hot: true,
  },
  configureWebpack: {
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};
