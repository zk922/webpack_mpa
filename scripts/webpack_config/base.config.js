const path = require('path');
const {PROJECT_PATH} = require('../config_scripts/appPath');
const env = process.env.NODE_ENV;


module.exports = {
  // context: SRC_PATH,                        //基础路径
  mode: 'development',
  output: {
    path: path.resolve(PROJECT_PATH, 'dist'),
    hashDigestLength: 8,                      //hash长度
    publicPath: '/',                           //静态资源根路径，使用cdn处理静态资源需要配置
    filename: env === 'production' ? '[name]/js/[name].[hash].js' : '[name]/js/[name].js',    //entry中每个bundle的打包文件
    chunkFilename: '[id].chunk.js'             //不在entry中分离出来的文件，比如split-chunck插件分离出来的
  },
  module: {
    rules: []
  },
  plugins: []
};
