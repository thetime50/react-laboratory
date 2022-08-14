/* eslint-disable
    unicorn/prefer-module, @typescript-eslint/no-var-requires, unicorn/prevent-abbreviations */

const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const common = require('./webpack.common');

// const { resolve } = require('node:path');
// const glob = require('glob');
// const PurgeCSSPlugin = require('purgecss-webpack-plugin');
// const { PROJECT_PATH } = require('../constants');

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'eval-source-map',
  devtool: 'hidden-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    /* eslint-disable max-len */
    // 这边的路径匹配还有问题
    // new PurgeCSSPlugin({ // 删除不用的css-class (如果没有完整的字符串是不是也会被剔除掉)
    //   paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{jsx,tsx,scss,less,css}`, { nodir: true }),
    //   whitelist: ['html', 'body'], // 白名单
    // }),
    /* eslint-enable max-len */
    // 包注释
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by react-ts-quick-starter (https://github.com/thetime50/react-laboratory/tree/main/react-project) */',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 开一个本地服务查看报告
      analyzerHost: '127.0.0.1', // host 设置
      analyzerPort: 8888, // 端口号设置
    }),
  ],

});
