/**
 * 配置优化配置项目
 * **/

/**
 * 添加common chunks配置
 * @param {object} config
 * @return {object}
 * **/
function addOptimization(config){
  config.optimization = {
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      minChunks: 1
    }
  };
  return config;
}
module.exports = addOptimization;
