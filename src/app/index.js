const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
/* 导入路由 */
const { userRouter } = require('../router/user.router')
/* 导入错误处理函数 */
const errorHandle = require('./error-handle')

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
//监听错误
app.on('error', errorHandle);
module.exports = app;