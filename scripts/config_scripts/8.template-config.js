/**
 * 在配置文件，生成html-webpack-plugin配置，以及模板loader配置的脚本
 * 对于模板的处理，包括loader部分和plugin配置部分，都在本文件种进行处理
 * 1.每个入口entry必须对应一个html-webpack-plugin配置
 * 2.支持html，ejs
 * 3.template模板文件名默认为文件夹下的[name].ejs/[name].html/index.ejs/index.html,优先级依次降低
 * 4.这个模块导出的方法需要在获取到入口文件后再调用。
 * **/
const fs = require('fs');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {PAGE_PATH, PROJECT_PATH} = require('./0.app-path');
const appConfig = require('../../app.config');


module.exports = function (config) {
  //1.获取环境信息
  const env = process.env.NODE_ENV;
  const isProduction = env === 'production';

  //2.模板的loader配置
  const htmlLoaderConfig = {
    minimize: isProduction,
    removeComments: isProduction,
    collapseWhitespace: isProduction,
    attrs: [':src', ':href']
  };
  const templateConfig = {
    html: {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: htmlLoaderConfig
        }
      ]
    },
    ejs: {
      test: /\.ejs$/,
      use: [
        {
          loader: 'html-loader',
          options: htmlLoaderConfig
        },
        {
          loader: path.resolve(__dirname, '../loaders/ejs-loader.js'), //自己简单实现的使用ejs2 engine的ejs-loader
          options: {
            context: PROJECT_PATH
          }
        }
      ]
    }
  };
  //3.获取当前的模板选择，默认html
  let ext = appConfig.template || 'html';

  /**
   * 给config添加loader配置
   * @param {object} config
   * @return {object} config
   * **/
  function addLoaderConfig(config){
    config.module.rules.unshift(templateConfig[ext]);
    return config;
  }

  /**
   * 给config添加html-webpack-plugin配置
   * @param {object} config
   * @return {object} config
   * **/
  function addPluginConfig(config){
    for(let entry of Object.keys(config.entry)){
      let templateList = [`${entry}.${ext}`, `index.${ext}`];    //可能的entry文件名
      let hasTemplate = templateList.some(template => {//1.检查是否有有效的模板文件
        let p = path.resolve(PAGE_PATH, entry, template);
        if(fs.existsSync(p)){
          config.plugins.push(new HtmlWebpackPlugin({
            template: p,
            chunks: [entry],
            title: entry,
            filename: entry + '/index.html',
            chunksSortMode: 'auto'
          }));
          return true;
        }
      });
      if(!hasTemplate){
        console.error(new Error(`当前模板配置为${ext}\n${entry} 页面没有找到合适的模板`));
        process.exit(1);
        break;
      }
    }
    return config;
  }

  /**
   * @param {object} config webpack的配置对象，需要已经使用entry.js中的脚本配置好了entry
   * @return {object}
   * **/
  function addTemplateConfig(config) {
    addLoaderConfig(config);
    addPluginConfig(config);
    return config;
  }

  return addTemplateConfig(config);
};
