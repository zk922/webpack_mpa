const parseArgs = require('minimist');
const productionArgs = ['production', 'prod', 'pro'];

/**
 * 处理参数，设置NODE_ENV的方法
 * 1.-env  或者 --env=  或者直接传参数来指定cli传入的环境参数
 * 2.设置NODE_ENV
 *  2.1.无参数时候，NODE_ENV = 'dev'
 *  2.2.参数为pro | prod | production 时，NODE_ENV = 'production'
 *  2.3.传入其他参数时候，NODE_ENV设置为传入的参数
 * **/
module.exports = function set_NODE_ENV(){
  let args = parseArgs(process.argv.slice(2));
  let env = args._[0] || args.env || 'dev';
  process.env.NODE_ENV = productionArgs.includes(env) ? 'production' : env;
};
