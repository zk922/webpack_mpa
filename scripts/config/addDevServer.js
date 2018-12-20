/**
 * 添加webpack-dev-server配置
 * **/
const {PROJECT_PATH} = require('./apppath');
const path = require('path');
function addDevServer(config){
  config.devServer = {
    contentBase: path.join(PROJECT_PATH, 'dist'),
    compress: true,
    port: 9000
  };
  return config;
}

module.exports = addDevServer;