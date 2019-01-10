const {imgLoader} = require('./0.loader-config');
/**
 * 添加对图片的loader配置
 * **/
function addImageConfig(config) {
  config.module.rules.push(imgLoader);
  return config;
}

module.exports = addImageConfig;
