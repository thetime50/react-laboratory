/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires,
  global-require */
const { resolve } = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css文件
const TerserPlugin = require('terser-webpack-plugin'); // js es6语法压缩 webpack4内置 引入自己配
// eslint-disable-next-line max-len
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩 webpack4插件
const OptimizeCssPlugin = require('css-minimizer-webpack-plugin'); // css 压缩

const { isDev, PROJECT_PATH } = require('../constants');

const getCssLoaders = (importLoaders) => [
  (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
  {
    loader: 'css-loader',
    options: {
      // modules: false,
      modules: {
        // localIdentName: '[hash:base64]', // default
        // localIdentName: '[path][name]__[local]--[hash:base64:5]',
        localIdentName: '[local]--[hash:base64:5]',
        // auto: true, // default
        auto: (filename) => /\.module\.\w+$/i.test(filename) || /\.icss\.\w+$/i.test(filename) || /\.m\.\w+$/i.test(filename),
      },
      sourceMap: isDev,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        plugins: [ // https://github.com/ckeditor/ckeditor5/issues/8315
        // 修复一些和 flex 布局相关的 bug
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              grid: true,
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          require('postcss-normalize'),
        ],
      },
      sourceMap: isDev,
    },
  },
];

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      Src: resolve(PROJECT_PATH, './src'),
      Components: resolve(PROJECT_PATH, './src/components'),
      Utils: resolve(PROJECT_PATH, './src/utils'),
      Assets: resolve(PROJECT_PATH, './src/assets'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        useShortDoctype: true,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          context: resolve(PROJECT_PATH, './public'),
          from: '*',
          to: resolve(PROJECT_PATH, './dist'),
          toType: 'dir',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    new ForkTsCheckerWebpackPlugin({ // 打包或本地服务时ts类型检查 bable只做ts编译
      typescript: {
        configFile: resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
    // !isDev && new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash:8].css',
    //   chunkFilename: 'css/[name].[contenthash:8].css',
    //   ignoreOrder: false,
    // }),
  ],
  // externals: { // 从cdn引入
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  optimization: {
    minimize: !isDev, // js压缩
    minimizer: [ // js 压缩配置
      !isDev && new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        },
      }),
      // !isDev && new OptimizeCssAssetsPlugin(),
      !isDev && new OptimizeCssPlugin(),
    ].filter(Boolean),
    splitChunks: { // 依赖单独打进一个chunk 如果依赖没有变更浏览器可以直接使用缓存
      chunks: 'all',
      name: false, // true 在新版本里不能用
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true }, // 缓存文件
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset',
        generator: {
          filename: 'assets/images/[name].[contenthash:8].[ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash:8].[ext]',
        },
      },

    ],
  },
};
