const webpack = require('webpack');

/**
 * 1.非生产环境条件下，webpack的mode设置为development
 * 2.生产环境条件下，webpack的mode设置为production
 * @param {object} config
 * @return {object}
 * **/
function setMode(config) {
  //1.设置webpack的mode
  config.mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
  //2.通过definePlugin，配置多环境
  config.plugins.push( new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }));
  return config;
}

module.exports = setMode;
