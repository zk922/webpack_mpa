const webpack = require('webpack');

const config = require('./webpack_config/base.config');    //基础配置文件
const getEntry = require('./config/entry');                  //获取entry配置
const addTemplateConfig = require('./config/addTemplateConfig');  //添加模板配置

getEntry(config)
.then(config => addTemplateConfig(config))
.then(config => {
  // console.log(JSON.stringify(config.module))
  webpack(config).run()
});
