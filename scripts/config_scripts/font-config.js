const {SRC_PATH} = require('./apppath');
/**
 * 添加字体文件配置
 * **/
function addFontConfig(config) {
  config.module.rules.push({
    test: /\.(eot|woff2?|ttf)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          name: process.env.NODE_ENV === 'production' ? 'fonts/[name].[hash].[ext]' : '[path][name].[ext]',
          limit: 5120,
          publicPath: "/",
          context: SRC_PATH,
          outputPath: "/"
        }
      }
    ]
  });
  return config;
}
module.exports = addFontConfig;
