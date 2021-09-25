/* 登录授权的路由 */
const Router = require('koa-router');

const authController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')
const authRouter = new Router({ prefix: '/login' })
//用户登录路由
authRouter.post('/',
    authMiddleware.verifyLogin,//检测登录参数
    authController.login,
)

module.exports = authRouter
