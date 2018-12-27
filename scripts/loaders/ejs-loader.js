/**
 * 简单实现的ejs-loader
 * **/
const {getOptions, parseQuery} = require('loader-utils');
const ejs = require('ejs');
module.exports = function ejsLoader(str){

  const options = Object.assign({}, getOptions(this));

  /**
   * ejs引擎配置在loader的options.ejsOptions上配置，与ejs可配置项目相同。
   * @link https://github.com/mde/ejs#options
   * 1.使用ejs渲染字符串模板，需要指定filename来告诉ejs引擎include子模板时的路径。this.resource即为文件的绝对路径。
   * 2.指定渲染上下文context，即this。这样，模板中就可以在this上获取运行环境相关的信息了。
   * **/
  let ejsOptions = Object.assign({filename: this.resource, context: this}, options.ejsOptions || {}, );


  /**
   * 传入模板中的数据，有两种方法配置：
   * 1.在loader的options.data处配置。
   * 2.在文件路径的search部分配置。使用parseQuery工具方法解析即可。
   * 最后将两部分合并传入模板解析
   * **/
  let query = {};
  if(this.resourceQuery){
    query = parseQuery(this.resourceQuery);
  }
  let data = Object.assign(options.data || {}, query);

  //parse the template
  let result;
  try{
    result = ejs.render(str, data, ejsOptions);
  }
  catch (e) {
    console.error(e);
  }

  return result;
};