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
      minChunks: 1,
      name: false,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10,
          enforce: true
        },
        common: {
          chunks: 'all',
          test: /[\\/]assets[\\/]/,
          minChunks: 1,
          priority: -10,
          enforce: true
        },
        default: false
      }
    }
    // runtimeChunk: {
    //   "name": "manifest"
    // }
  };
  return config;
}
module.exports = addOptimization;
