/**
 * 打包命令只能在项目根目录执行，这个文件是处理项目相关路径的
 * **/
const path = require('path');
const fs = require('fs');


let PROJECT_PATH = process.cwd();                     //项目路径，与执行打包的路径一致
let SRC_PATH = path.resolve(PROJECT_PATH, 'src');      //src目录路径

if(!fs.existsSync(SRC_PATH)){  //如果src目录不存在，报错，退出进程。
  console.error('未找到源码目录，请在项目根目录下执行打包命令');
  process.exit(1);
}
let PAGE_PATH = path.resolve(SRC_PATH, 'pages');

module.exports = {
  PROJECT_PATH,
  SRC_PATH,
  PAGE_PATH
};