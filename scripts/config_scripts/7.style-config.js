const appConfig = require('../../app.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {styleLoader} = require('./0.loader-config');
const {getType} = require('./utils');
/**
 * 添加样式表的配置
 * **/
module.exports = function addStyleConfig(config) {

  let isProduction = process.env.NODE_ENV === 'production';
  let ext = appConfig.style || 'css';

  let pluginConfig = new MiniCssExtractPlugin({                              //分离css为单独文件的插件
    filename: isProduction ? "[name]/style/[name].[hash].css" : "[name]/style/[name].css",
    chunkFilename: isProduction ? "[name].[hash].css" : "[name].css"
  });

  let added = false;
  function addConfig(ext){
    if((ext === 'scss' || ext === 'sass') && !added){
      config.module.rules.push(styleLoader.sass);
      added = true;
    }
    else{
      if(!styleLoader[ext]) throw Error('没有找到对应的样式表配置');
      config.module.rules.push(styleLoader[ext]);
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
    throw Error('app.config  style  配置错误。配置应为字符串或者数组');
  }
  config.plugins.push(pluginConfig);

  return config;
};
