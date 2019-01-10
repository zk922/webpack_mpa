const {SRC_PATH, PROJECT_PATH} = require('./0.app-path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
/**
 * 各种loader文件的默认配置，需要在设置环境变量的方法set_NODE_ENV之后再引入。
 * **/
const fontLoader = {
  test: /\.(eot|woff2?|ttf)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        name: process.env.NODE_ENV === 'production' ? 'fonts/[name].[hash].[ext]' : '[path][name].[ext]',
        limit: 5120,
        publicPath: "/",
        context: SRC_PATH,
        outputPath: "/"
      }
    }
  ]
};
const imgLoader = {
  test: /\.(png|jpe?g|gif|svg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: process.env.NODE_ENV === 'production' ? 'images/[hash].[ext]' : '[path][name].[ext]',
        publicPath: '/',
        context: SRC_PATH,        //源码目录,这里更改context，是为了在开发环境下，导出图片和图片源的路径一致
        outputPath: '/'
      }
    }
  ]
};
const languageLoader = {
  ts: {
    test: /\.tsx?$/,
    use: [
      'babel-loader',
      'ts-loader'
    ]
  },
  js: {
    test: /\.js$/,
    use: [
      'babel-loader'
    ]
  }
};
const styleLoader = {
  sass: {
    test: /\.(scss|sass)$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",                                   // translates CSS into CommonJS
      "sass-loader"                                   // compiles Sass to CSS, using Node Sass by default
    ]
  },
  less: {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",                                   // translates CSS into CommonJS
      "less-loader"                                   // compiles Less to CSS
    ]
  },
  css: {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",                                   // translates CSS into CommonJS
    ]
  }
};



const htmlLoaderConfig = {
  minimize: isProduction,
  removeComments: isProduction,
  collapseWhitespace: isProduction,
  attrs: [':src', ':href']
};
const templateConfig = {
  html: {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: htmlLoaderConfig
      }
    ]
  },
  ejs: {
    test: /\.ejs$/,
    use: [
      {
        loader: 'html-loader',
        options: htmlLoaderConfig
      },
      {
        loader: path.resolve(__dirname, '../loaders/ejs-loader.js'), //自己简单实现的使用ejs2 engine的ejs-loader
        options: {
          context: PROJECT_PATH
        }
      }
    ]
  }
};


module.exports = {
  fontLoader,
  imgLoader,
  languageLoader,
  styleLoader,
  templateConfig
};
