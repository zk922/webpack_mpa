const webpack = require('webpack');
const set_NODE_ENV = require('./config_scripts/argv');
const generateConfig = require('./config_scripts/generate');


//1.根据输入参数，设置process.env.NODE_ENV
set_NODE_ENV();

//2.动态生成配置文件，执行打包脚本
generateConfig().then(config => {
  // console.dir(config);
  webpack(config).run((err, stats)=>{
    console.log(stats.toString({
      colors: true    // Shows colors in the console
    }));
  });
});
