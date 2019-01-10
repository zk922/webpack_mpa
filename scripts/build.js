const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');

//1.根据输入参数，设置process.env.NODE_ENV
const set_NODE_ENV = require('./config_scripts/argv');
set_NODE_ENV();

//2.动态生成配置文件，执行打包脚本
const generateConfig = require('./config_scripts/generate');
generateConfig().then(config => {
  //2.1.删除旧dist目录
  let distPath = path.resolve(process.cwd(), 'dist');
  if(fs.existsSync(distPath)){
    rimraf.sync(distPath);
  }
  //2.2.执行打包
  webpack(config).run((err, stats)=>{
    if(err){
      console.error(err);
      return;
    }
    console.log(stats.toString({
      colors: true
    }));
  });
});
