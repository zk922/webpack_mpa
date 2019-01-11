const appConfig = require('../../app.config');
const {languageLoader} = require('./0.loader-config');
let {getType} = require('./utils');


/**
 * 对代码配置babel
 * **/
module.exports = function (config) {
  let jsLoaderAdded = false;
  function addJsConfig(){
    if(jsLoaderAdded) return;
    config.resolve.extensions.push('.js');
    config.module.rules.push(languageLoader.js);
    jsLoaderAdded = true;
  }

  let tsLoaderAdded = false;
  function addTsConfig(){
    if(tsLoaderAdded) return;
    config.resolve.extensions.push('.ts', '.tsx');
    config.module.rules.push(languageLoader.ts);
    tsLoaderAdded = true;
  }

  let language = appConfig.language || 'js';

  addJsConfig(); //无论如何，都会给js添加babel配置

  if(getType(language) === 'string'){
    if(language === 'ts') addTsConfig();
  }
  else if(getType(language) === 'array'){
    language.forEach(v => {
      if(v === 'ts' || v === 'tsx'){
        addTsConfig();
      }
      else{
        if(!language[v]) throw Error(`没有找到${v}文件对应的loader`);
        config.resolve.extensions.push('.' + v);
        config.module.rules.push(languageLoader[v]);
      }
    });
  }
  else {
    throw new Error(`app.config   language   配置错误`);
  }
  return config;
};
