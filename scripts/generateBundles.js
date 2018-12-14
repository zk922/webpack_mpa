/**
 * 这个文件中的方法，是用来整理bundles的入口的
 * 1. output出口目录默认为dist目录
 * 2. src/pages目录下的"文件夹名"作为每个bundle的name，文件夹下的[name].js/[name].ts/index.js/index.ts作为entry point
 * **/
const fs = require('fs');
const path = require('path');

const {PAGE_PATH} = require('./appPath');

let res, rej;
const promise = new Promise((resolve, reject) => {
  res = resolve;
  rej = reject;
});
module.exports = promise;


/**
 * 获取src/pages下的页面列表
 * **/
let pageList;
fs.readdir(PAGE_PATH, { withFileTypes: true }, function(err, files){
  if(err){
    console.error('获取page列表失败', err);
    process.exit(1);
  }
  pageList = files.filter(file => file.isDirectory());
});

/**
 * 获取入口文件
 * **/
