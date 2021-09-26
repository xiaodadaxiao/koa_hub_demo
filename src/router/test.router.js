
const Router = require('koa-router');

/* 
要测试的路由
*/
const { verifyAuth } = require('../middleware/auth.middleware')

const testRouter = new Router({ prefix: '/test' })
//测试 路由
testRouter.post('/token',
    verifyAuth,
    (ctx, next) => {
        ctx.body = '测试接口通过~'
    }
)

module.exports = testRouter
