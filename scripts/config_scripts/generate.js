const config = require('./0.base.config');                  //基础配置文件
const setMode = require('./1.mode');                        //设置环境变量和mode
const getEntry = require('./2.entry');                      //获取entry配置
const setOutput = require('./3.output');                    //设置出口
const addFontConfig = require('./4.font-config');           //添加文字配置
const addImageConfig = require('./5.image-config');         //添加图片配置项
const addLanguageConfig = require('./6.language-config');   //添加语言配置项，babel，ts之类的
const addStyleConfig = require('./7.style-config');         //设置样式表配置
const addTemplateConfig = require('./8.template-config');   //添加模板配置
const addOptimization = require('./9.optimize');            //添加优化配置项
const addDevtool = require('./10.devtool');                 //devtool sourcemap配置

let {getType} = require('./utils');

module.exports = async function generateConfig(){
  await setMode(config);
  await getEntry(config);
  await setOutput(config);
  await addFontConfig(config);
  await addImageConfig(config);
  await addLanguageConfig(config);
  await addStyleConfig(config);
  await addTemplateConfig(config);
  await addOptimization(config);
  await addDevtool(config);

  //尝试添加自定义的配置
  let customConfig = require('../../mpa.config');
  if(getType(customConfig) === 'function'){
    await customConfig(config);
  }

  return config;
};
