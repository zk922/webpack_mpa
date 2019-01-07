const {PROJECT_PATH} = require('./0.app-path');
const path = require('path');

/**
 * 配置出口
 * @param {object} config
 * @param {object} config
 * **/
module.exports = function addOutPut(config){
  let isProduction = process.env.NODE_ENV === 'production';
  config.output = {
    path: path.resolve(PROJECT_PATH, 'dist'),
    hashDigestLength: 8,                      //hash长度
    publicPath: '/',                           //静态资源根路径，使用cdn处理静态资源需要配置
    filename: isProduction ? '[name]/js/[name].[hash].js' : '[name]/js/[name].js',    //entry中每个bundle的打包文件
    chunkFilename: isProduction ? '[id].[hash].chunk.js' : '[id].chunk.js'             //不在entry中分离出来的文件，比如split-chunck插件分离出来的
  };

  return config;
};
