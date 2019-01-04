/**
 * 开发服务器
 * **/
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const cp = require('child_process');
const hotMiddleware = require('webpack-hot-middleware');

const generateConfig = require('./generate');
const appConfig = require('../app.config');


generateConfig().then(config => {
  //添加热更配置
  let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  let entry = config.entry;
  let newEntry = {};
  Object.keys(entry).forEach(k=>newEntry[k]=[entry[k], hotMiddlewareScript]);
  config.entry = newEntry;
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  let app = express();
  let compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
  app.use(hotMiddleware(compiler));
  app.listen(appConfig.devServer.port, err => {
    if(err){
      console.error(err);
    }
    console.log('server started');
    cp.exec('explorer http://localhost:' + appConfig.devServer.port + '/' + Object.keys(config.entry)[0]);
  })
});
