/**
 * 开发服务器
 * **/
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const cp = require('child_process');
const hotMiddleware = require('webpack-hot-middleware');

const appConfig = require('../app.config');

//1.根据输入参数，设置process.env.NODE_ENV
const set_NODE_ENV = require('./config_scripts/argv');
set_NODE_ENV();

//2.动态生成打包配置，启动服务器
const generateConfig = require('./config_scripts/generate');
generateConfig().then(config => {
  //1.添加热更功能需要的入口配置
  let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  let entry = config.entry;
  let newEntry = {};
  Object.keys(entry).forEach(k => newEntry[k] = [entry[k], hotMiddlewareScript]);
  config.entry = newEntry;
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  //2.启动express服务器
  let app = express();
  let compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
    // writeToDisk: true
  }));
  app.use(hotMiddleware(compiler));
  app.get('/', function (req, res, next) {
    res.send(config);
  });
  let port = appConfig.devServer ? appConfig.devServer.port : 3100;
  app.listen(port, err => {
    if(err){
      console.error(err);
    }
    console.log('server started at port: ' + port);
    //3.打包完成，服务器启动后，自动打开浏览器
    cp.exec('explorer http://localhost:' + port + '/' + Object.keys(config.entry)[0]);
  });
});
