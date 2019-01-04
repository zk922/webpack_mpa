const webpack = require('webpack');

const config = require('./webpack_config/base.config');                  //基础配置文件
const setEnv = require('./config_scripts/env');                          //设置环境变量和mode
const getEntry = require('./config_scripts/entry');                      //获取entry配置
const addStyleConfig = require('./config_scripts/style-config');
const addTemplateConfig = require('./config_scripts/template-config');   //添加模板配置
const addOptimization = require('./config_scripts/optimize');            //添加优化配置项
const addImageConfig = require('./config_scripts/image-config');         //添加图片配置项
const addFontConfig = require('./config_scripts/font-config');           //添加文字配置

getEntry(config)
.then(config => setEnv(config))
.then(config => addStyleConfig(config))
.then(config => addTemplateConfig(config))
.then(config => addOptimization(config))
.then(config => addImageConfig(config))
.then(config => addFontConfig(config))
.then(config => {
  // console.dir(config);
  webpack(config).run((err, stats)=>{
    console.log(stats.toString({
      colors: true    // Shows colors in the console
    }));
  })
});
