/**
 * 简单实现的ejs-loader
 * **/
const {getOptions, parseQuery} = require('loader-utils');
const ejs = require('ejs');

module.exports = function ejsLoader(str){

  const options = Object.assign({}, getOptions(this));

  //使用ejs渲染字符串模板，需要指定filename来告诉ejs引擎include子模板时的路径。
  let ejsOptions = Object.assign(options.ejsOptions || {}, {filename: this.resource});

  let query = {};
  if(this.resourceQuery){
    query = parseQuery(this.resourceQuery);
  }

  let data = Object.assign(options.data || {}, query);

  let result;
  try{
    result = ejs.render(str, data, ejsOptions);
  }
  catch (e) {
    console.log(e);
  }
  return result;
};