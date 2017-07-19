## 通用多页面项目脚手架，项目所使用的工具如下
> node -version 6.9.3

- yarn
- webpack 2.x.x
- bower

## How use it?
download project

    git clone git@139.196.126.103:sapling-team/generate-common-mpa.git

remove git origin and add your project new origin

    git remote remove origin

    git remote add origin gitUrl

    git pull

pack install

    yarn install
    bower install

we can using npm scripts start dev product test

    npm run build 打包出生产环境代码
    npm run build-dev 打包出开发环境代码
    npm run dev 启动webpack dev构建环境

## ****添加第三方插件***
- bower install ** --save //** 外链包
- yarn add ** [--dev]  //** require webpack打包的依赖包 [开发环境]

## ***配置***
> ./app/compile.config.json

	- title{}  //jade title设置
	- script[] //lib.jade 外链js
	- styles[] //style.jade 外链css

## 目录结构

```
|
|----- build   脚手架配置环境
|
|
|----- config  环境配置文件
|
|
|----- dist    生产打包文件
|
|
|----- static  静态文件[...link]
|
|
|----- app     开发环境文件
|       |
|       |
|       |----- src         	业务代码
|       |
|       |
|       |----- images      	图片资源
|       |
|       |
|       |----- stylesheets 	样式
|       |
|       |
|       |----- web 			预编译jade
|       |
|       |
|       |----- compile.config.js 	配置文件
|
|
|----- .babelrc    babel配置
|
|
|----- .eslintrc   eslint配置
|
|
|----- .babelrc    babel配置
|
|
```