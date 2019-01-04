const webpack = require('webpack');
const generateConfig = require('./generate');

generateConfig().then(config => {
  // console.dir(config);
  webpack(config).run((err, stats)=>{
    console.log(stats.toString({
      colors: true    // Shows colors in the console
    }));
  });
});
