/**
 * 开发服务器
 * **/
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const generateConfig = require('./generate');
const appConfig = require('../app.config');

generateConfig().then(config => {
  let app = express();
  app.use(webpackDevMiddleware(webpack(config), {
    publicPath: config.output.publicPath
  }));

  app.listen(appConfig.devServer.port, (err)=>{
    if(err){
      console.error(err);
    }
    console.log('server started')
  })
});
