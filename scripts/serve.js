/**
 * 开发服务器
 * **/
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');

const config = require('./webpack_config/base.config');           //基础配置文件
const getEntry = require('./config/entry');                       //获取entry配置
const addTemplateConfig = require('./config/addTemplateConfig');  //添加模板配置

getEntry(config)
.then(config => addTemplateConfig(config))
.then(config => {
  let app = express();
  app.use(webpackDevMiddleware(webpack(config), {
    publicPath: config.output.publicPath
  }));

  app.listen(3100, ()=>{
    console.log('server started')
  })

});