const Router = require('koa-router')

const userController = require('../controller/user.controller')
const userMiddleWare = require('../middleware/user.middleware')
const userRouter = new Router({ prefix: '/user' });

//用户注册路由
userRouter.post('/', userMiddleWare.verifyUser, userController.create)

module.exports = {
    userRouter
}