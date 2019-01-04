const parseArgs = require('minimist');
const webpack = require('webpack');
const productionArgs = ['production', 'prod', 'pro'];


/**
 * 解析传入的环境参数，来配置process.env.NODE_ENV
 * 1.-env  或者 --env=  或者直接传参数来指定cli传入的环境参数
 * 2.将NODE_ENV设置为传入的参数，无参数设置为dev
 * 2.参数为pro prod production时，为生产环境
 * 4.非生产环境条件下，webpack的mode设置为development
 * 5.生产环境条件下，webpack的mode设置为production
 * @param {object} config
 * @return {object}
 * **/
function setEnv(config) {
  let args = parseArgs(process.argv.slice(2));
  let env = args._[0] || args.env || 'dev';
  //1.设置webpack的mode
  process.env.NODE_ENV = productionArgs.includes(env) ? 'production' : env;
  config.mode = productionArgs.includes(env) ? 'production' : 'development';
  config.plugins.push( new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }));
  return config;
}

module.exports = setEnv;
