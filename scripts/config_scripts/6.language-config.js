const appConfig = require('../../app.config');
const {languageLoader} = require('./0.loader-config');
let {getType} = require('./utils');


/**
 * 对代码配置babel
 * **/
module.exports = function (config) {


  let language = appConfig.language || 'js';
  let resolve;
  if(getType(language) === 'string'){
    resolve = [language];
  }
  else if(getType(language) === 'array'){
    resolve = language;
  }
  else {
    throw new Error(`app.config   language   配置错误`);
  }
  config.resolve.extensions = resolve;

  resolve.forEach(v => {
    if(!languageLoader[v]){
      throw new Error(`未找到${v}文件对应的loader默认配置`);
    }
    config.module.rules.push(languageLoader[v]);
  });

  return config;
};
