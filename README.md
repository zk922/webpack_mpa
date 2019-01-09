# 多页面通用webpack项目脚手架

通用的多页面webpack项目脚手架。项目结构：

```
|--- dist                    //打包输出目录
|--- scripts                 //webpack打包配置脚本
|--- scr                     //项目源码目录
|    |--- components         //公共组件目录
|    |--- env                //多环境配置目录
|    |--- pages              //页面目录
|    |    |--- page1         //page1的目录
|    |    |    |--- index.ejs      //page1的模板
|    |    |    |--- index.ts       //page1的主文件，可以配置成ts
|    |    |    |--- style.scss     //page1的样式文件，需要在主js文件中引入
|    |    |
|    |    |--- page2
|    |    |    |--- page2.html     //模板文件默认也可以为html
|    |    |    |--- page2.js       //page2的主文件
|    |    |    |--- page2.scss     //样式文件，需要在主文件中引入
|    |    |
|    |    |--- other pages...            //其他页面  
|    |    
|    |--- assets             //公共资源，其他静态资源目录
|
|--- app.config.json         //项目的打包配置文件
|
|---  

```

## TODO
- [ ] babel
- [ ] post-css  
- [ ] hmr  
- [ ] Uglify  
- [ ] unit test
- [x] environments
- [ ] hook before compile
