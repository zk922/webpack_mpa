let {fontLoader} = require('./0.loader-config');
/**
 * 添加字体文件配置
 * **/
function addFontConfig(config) {
  config.module.rules.push(fontLoader);
  return config;
}
module.exports = addFontConfig;
