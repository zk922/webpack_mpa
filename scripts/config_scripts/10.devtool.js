/** 添加devtool配置 **/
module.exports = function addDevtool(config) {
  let isProduction = process.env.NODE_ENV === 'production';
  config.devtool = isProduction ? 'none' : 'inline-source-map';
  return config;
};
