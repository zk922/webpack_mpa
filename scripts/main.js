const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

let config = require('./webpack_config/base.config');
let getEntry = require('./js/getEntries');      //获取entry配置

getEntry().then(entry=>{
  config.entry = entry;
  webpack(config).run(function (v){

  });
});