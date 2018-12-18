/**
 * 这个文件中的方法，是用来整理bundles的入口的
 * 1. output出口目录默认为dist目录
 * 2. src/pages目录下的"文件夹名"作为每个bundle的name，文件夹下的[name].js/[name].ts/index.js/index.ts作为entry point
 * **/
const fs = require('fs');
const path = require('path');

const {PAGE_PATH} = require('./appPath');


/**
 * 1.获取src/pages下的页面列表
 * 只有目录下的directory才会被当成页面，并处理成入口
 *
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
 * @param{Dirent[]} pageList
 * @return {Promise<object>}
 * **/
function getEntries(pageList){
  return new Promise((resolve, reject)=>{
    if(pageList.length === 0){
      reject({msg: `没有识别到pageList，无法获取入口文件`});
      process.exit(1);
      return;
    }
    let entry = {};
    pageList.forEach(function(page){
      let p = path.resolve(PAGE_PATH, page.name);
      let entryList = [page.name + '.js', page.name + '.ts', 'index.js', 'index.ts'];
      entryList.some(v => {
        let entryPath = path.resolve(p, v);
        if(fs.existsSync(entryPath)){
          return entry[page.name] = entryPath;
        }
      });
      resolve(entry);
    });
  });
}

module.exports = function (){
  return getPageList().then(v=>getEntries(v));
};