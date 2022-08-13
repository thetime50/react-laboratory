/* eslint-disable
    unicorn/prefer-module, @typescript-eslint/no-var-requires, unicorn/prevent-abbreviations */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const proxySetting = require('../set-proxy');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    // stats: 'errors-only', // 终端仅打印 error
    // clientLogLevel: 'silent', // 日志等级 // webpack 3.11.0 https://webpack-v3.jsx.app/configuration/dev-server/#devserver-clientloglevel
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    proxy: { ...proxySetting },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // infrastructureLogging: {
  //   level: 'warn', // webpack5 https://webpack.js.org/configuration/other-options/#level
  // },
  devtool: 'source-map',
});
