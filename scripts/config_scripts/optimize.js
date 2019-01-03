/**
 * 配置优化配置项目
 * **/

/**
 * 添加common chunks配置
 * @param {object} config
 * @return {object}
 * **/
let i = 0;
let arr=['a','b','c','d','e','f','g','h'];
function addOptimization(config){
  config.optimization = {
    splitChunks: {
      chunks: 'all',
      // maxSize: 500000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      minChunks: 1,
      name: false,
      // name: function () {
      //
      //   return arr[i++];
      // },
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendors',
          // filename: 'abv.js',
          minChunks: 1,
          priority: -10,
          enforce: true
        },
        common: {
          chunks: 'all',
          test: /[\\/]public[\\/]/,
          // name: 'vendors',
          // filename: 'abv.js',
          minChunks: 1,
          priority: -10,
          enforce: true
        }
      },

    }
    // runtimeChunk: {
    //   "name": "manifest"
    // }
  };
  return config;
}
module.exports = addOptimization;