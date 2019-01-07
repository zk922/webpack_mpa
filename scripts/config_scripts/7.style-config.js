const appConfig = require('../../app.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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


  if(ext === 'scss' || 'sass'){
    config.module.rules.push(sassConfig);
  }
  else if(ext === 'less'){
    config.module.rules.push(lessConfig);
  }
  else {
    config.module.rules.push(cssConfig);
  }

  config.plugins.push(pluginConfig);

  return config;
};
