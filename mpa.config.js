const VueLoaderPlugin = require('vue-loader/lib/plugin');

const {styleLoader, languageLoader} = require('./scripts/config_scripts/0.loader-config')

/**
 * 添加上vue的loader配置
 * ts
 * scss
 * @param {object} config
 * @return {object} config
 * **/
function addVueConfigs(config) {
  let rules = config.module.rules;
  //1.配置vue-loader
  rules.push({
    test: /\.vue$/,
    loader: 'vue-loader'
  });
  //2.添加extensions配置
  config.resolve.extensions.push('.vue');
  //3.添加vue插件配置
  config.plugins.push(new VueLoaderPlugin());



  // //4.替换js配置
  // rules.splice(rules.indexOf(languageLoader.js), 1, {
  //
  // })


  //5.添加ts配置
  languageLoader.ts.options = { appendTsSuffixTo: [/\.vue$/] }

  return config;
}


module.exports = addVueConfigs;
