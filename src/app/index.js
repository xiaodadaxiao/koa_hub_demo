const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
/* 导入路由导入函数 */
const useRoutersToApp = require('../router')

/* 导入错误处理函数 */
const errorHandle = require('./error-handle')

const app = new Koa();

//参数处理
app.use(bodyParser());

//函数动态导入路由
useRoutersToApp(app);
//监听错误
app.on('error', errorHandle);
module.exports = app;