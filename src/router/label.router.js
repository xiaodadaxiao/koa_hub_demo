/* 标签相关接口 */
const Router = require('koa-router')
const labelController = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyCreateParam } = require('../middleware/label.middleware')

const labelRouter = new Router({ prefix: '/label' });
labelRouter.post('/',
    verifyCreateParam,//检查参数
    verifyAuth,//检查token
    labelController.create
)
module.exports = labelRouter
