/**
 * 这个文件中的方法，是用来整理bundles的入口的
 * 1. output出口目录默认为dist目录
 * 2. src/pages目录下的"文件夹名"作为每个bundle的name，文件夹下的[name].js/[name].ts/index.js/index.ts
 *    作为entry point，优先级依次降低。（见代码line 46）
 * **/
const fs = require('fs');
const path = require('path');
const {PAGE_PATH} = require('./0.app-path');


/**
 * 1.获取src/pages下的页面列表
 * 只有目录下的directory才会被当成页面，并处理成入口
 * @return {Promise<Dirent[]>}
 * **/
function getPageList(){
  return new Promise((resolve, reject)=>{
    fs.readdir(PAGE_PATH, { withFileTypes: true }, function(err, files){
      if(err){
        console.error('获取page列表失败', err);
        reject(err);
        process.exit(1);
      }
      let pageList = files.filter(file => file.isDirectory());
      resolve(pageList);
    });
  });
}

/**
 * 2.获取入口文件
 * @param{Array<Dirent>} pageList
 * @return {object}  entry配置项
 * **/
function getEntry(pageList){
  if(pageList.length === 0){
    let err = new Error(`没有识别到pageList，无法获取入口文件`);
    console.error(err);
    process.exit(1);
    return null;
  }
  let entry = {};
  pageList.forEach(/**@param {Dirent} page **/function(page){//获取自建page列表
    let p = path.resolve(PAGE_PATH, page.name);
    let entryList = [page.name + '.js', page.name + '.ts', 'index.js', 'index.ts']; //可能的entry文件名
    entryList.some(v => {     //如果目录下找不到符合上面文件名格式的js或者ts文件，这个目录就会忽略。
      let entryPath = path.resolve(p, v);
      if(fs.existsSync(entryPath)){
        return entry[page.name] = entryPath;
      }
    });
  });
  return entry;
}
/**
 * 导出模块
 * 该方法接收config为参数，并在config上添加entry配置。返回promise resolve值为config
 * @param {object} config
 * @return{Promise}
 * **/
module.exports = function(config){
  return getPageList()
  .then(v => getEntry(v))
  .then(v => {
    config.entry = v;
    return config;
  })
  .catch(e => console.log(e));
};
