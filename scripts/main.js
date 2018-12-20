const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const config = require('./webpack_config/base.config');    //基础配置文件
const getEntry = require('./config/entry');                  //获取entry配置

getEntry(config)
.then(config => {
  webpack(config).run(err => {

  })
});
