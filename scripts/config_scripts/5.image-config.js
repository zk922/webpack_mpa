const {SRC_PATH} = require('./0.app-path');
/**
 * 添加对图片的loader配置
 * **/
function addImageConfig(config) {
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: process.env.NODE_ENV === 'production' ? 'images/[hash].[ext]' : '[path][name].[ext]',
          publicPath: '/',
          context: SRC_PATH,        //源码目录,这里更改context，是为了在开发环境下，导出图片和图片源的路径一致
          outputPath: '/'
        }
      }
    ]
  });
  return config;
}

module.exports = addImageConfig;
