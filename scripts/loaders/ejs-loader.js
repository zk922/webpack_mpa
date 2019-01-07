/**
 * 简单实现的ejs-loader
 * **/
const {getOptions, parseQuery} = require('loader-utils');
const ejs = require('ejs');
const {relative, resolve, dirname} = require('path');

module.exports = function ejsLoader(str){

  const defaultOptions = {
    context: resolve(process.cwd())
  };

  const options = Object.assign({}, defaultOptions, getOptions(this));

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
   * 3.添加一些可能在层叠模板中需要用到的相对路径前缀，比如SRC目录用来处理图片和第三方lib的src属性
   * 最后将两部分合并传入模板解析
   * **/
  //query中的参数
  let query = {};
  if(this.resourceQuery){
    query = parseQuery(this.resourceQuery);
  }
  //模板中可能用到的变量，其实也可以去模板中再进行计算
  let relativePath;       //入口模板文件与SRC目录的相对路径
  try{
    relativePath = relative(dirname(this.resource), options.context);
  }
  catch (e) {
    relativePath = relative(dirname(this.resource), defaultOptions.context);
    console.log(e);
  }

  let data = Object.assign(
    options.data || {},
    query,
    {context: relativePath}
  );

  //parse the template
  let result;
  try{
    result = ejs.compile(str, ejsOptions)(data);
  }
  catch (e) {
    console.error(e);
  }

  return result;
};
