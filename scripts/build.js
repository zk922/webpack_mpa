const webpack = require('webpack');

const config = require('./webpack_config/base.config');    //基础配置文件
const getEntry = require('./config_scripts/entry');                  //获取entry配置
const addTemplateConfig = require('./config_scripts/template-config');  //添加模板配置
const addOptimization = require('./config_scripts/optimize');
getEntry(config)
.then(config => addTemplateConfig(config))
.then(config => addOptimization(config))
.then(config => {
  webpack(config).run((err, stats)=>{
    console.log(stats.toString({
      colors: true    // Shows colors in the console
    }));
  })
});
