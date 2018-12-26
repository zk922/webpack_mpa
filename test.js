// import ejsLoader from './scripts/loaders/ejs-loader';
//
//
// console.log(ejsLoader('<%= "abc" %>'))
const ejs = require('ejs');
ejs.render('<% include ./src/pages/page2/test.ejs%>')