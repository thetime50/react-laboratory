/* eslint-disable
    unicorn/prefer-module, @typescript-eslint/no-var-requires, unicorn/prevent-abbreviations */

const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'eval-source-map',
  devtool: 'hidden-source-map',
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
