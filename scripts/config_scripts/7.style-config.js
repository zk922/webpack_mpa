const appConfig = require('../../app.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {getType} = require('./utils');
/**
 * 添加样式表的配置
 * **/
module.exports = function addStyleConfig(config) {

  let isProduction = process.env.NODE_ENV === 'production';
  let ext = appConfig.style || 'css';

  let sassConfig = {
    test: /\.(scss|sass)$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",                                   // translates CSS into CommonJS
      "sass-loader"                                   // compiles Sass to CSS, using Node Sass by default
    ]
  };
  let lessConfig = {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",                                   // translates CSS into CommonJS
      "less-loader"                                   // compiles Less to CSS
    ]
  };
  let cssConfig = {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",                                   // translates CSS into CommonJS
    ]
  };

  let pluginConfig = new MiniCssExtractPlugin({                              //分离css为单独文件的插件
    filename: isProduction ? "[name]/style/[name].[hash].css" : "[name]/style/[name].css",
    chunkFilename: isProduction ? "[name].[hash].css" : "[name].css"
  });

  function addConfig(ext) {
    if(ext === 'scss' || 'sass'){
      config.module.rules.push(sassConfig);
    }
    else if(ext === 'less'){
      config.module.rules.push(lessConfig);
    }
    else if(ext === 'css'){
      config.module.rules.push(cssConfig);
    }
    else {
      throw Error('没有找到对应的样式表配置');
    }
  }


  /**================= addConfig ====================**/
  if(getType(ext) === 'string'){//如果仅有一种样式文件
    addConfig(ext);
  }
  else if(getType(ext) === 'array'){
    ext.forEach(function (v){
      addConfig(v);
    })
  }
  else {
    throw Error('app.config  style  配置错误');
  }
  config.plugins.push(pluginConfig);

  return config;
};
