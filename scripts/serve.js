/**
 * 开发服务器
 * **/
const Koa = require('koa');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack_config/base.config');           //基础配置文件
const getEntry = require('./config/entry');                       //获取entry配置
const addTemplateConfig = require('./config/addTemplateConfig');  //添加模板配置
const addDevServer = require('./config/addDevServer');            //添加开发服务器配置

getEntry(config)
.then(config => addTemplateConfig(config))
.then(config => addDevServer(config))
.then(config => {
  let app = new Koa();
  app.use(webpackDevMiddleware(webpack(config), {
    publicPath: config.output.publicPath
  }));

  app.listen(3111, ()=>{
    console.log('dev server started');
  })
});