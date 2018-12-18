const path = require('path');

const {PROJECT_PATH, SRC_PATH} = require('../js/appPath');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const env = process.env.NODE_ENV;


module.exports = {
  context: SRC_PATH,                        //基础路径
  output: {
    path: path.resolve(PROJECT_PATH, 'dist'),
    hashDigestLength: 16,                      //hash长度
    publicPath: '/',                           //静态资源根路径，使用cdn处理静态资源需要配置
    filename: env === 'production' ? '[name]/js/[name].[hash].js' : '[name]/js/[name].js',    //entry中每个bundle的打包文件
    chunkFilename: '[id].chunk.js'
  },
  module: {
    noParse: /lodash|jquery/,                   //不解析常见的第三方库，如果使用别的，可以在这里添加
    rules: [
      {
        test: /\.scss$/,
        use: [
          env === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          "css-loader",                                   // translates CSS into CommonJS
          "sass-loader"                                   // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [
          env === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          "css-loader",                                   // translates CSS into CommonJS
          "less-loader"                                   // compiles Lass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: env === 'production' ? 'images/[hash].[ext]' : '[path][name].[ext]',
              publicPath: '/',
              context: SRC_PATH,        //源码目录
              outputPath: '/images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({                              //分离css为单独文件的插件
      filename: "[name]/style/[name].css",
      chunkFilename: "[name]/style/[id].css"
    })
  ],
};