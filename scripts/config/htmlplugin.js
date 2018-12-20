/**
 * 在配置文件，生成html-webpack-plugin配置，以及模板loader配置的脚本
 * 对于模板的处理，包括loader部分和plugin配置部分，都在本文件种进行处理
 * 1.每个入口entry必须对应一个html-webpack-plugin配置
 * 2.支持html，ejs
 * 3.template模板文件名默认为文件夹下的[name].ejs/[name].html/index.ejs/index.html,优先级依次降低
 * **/
const fs = require('fs');
const path = require('path');
const {PAGE_PATH} = require('./apppath');

