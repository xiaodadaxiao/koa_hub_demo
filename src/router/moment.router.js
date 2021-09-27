
//用户动态相关路由
const Router = require('koa-router')

const momentContorller = require('../controller/moment.contorller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { verifyContent, verifyDetailListQuery } = require('../middleware/moment.middleware')

const momentRouter = new Router({ prefix: '/moment' })

//发表动态接口
momentRouter.post('/',
    verifyAuth,//校验token
    verifyContent,//校验用户动态内容
    momentContorller.create
)
//获取单条动态
momentRouter.get('/:momentId',
    momentContorller.detail
)

//获取单条动态
momentRouter.get('/',
    verifyDetailListQuery,//校验参数
    momentContorller.list,
)
//修改动态
momentRouter.patch('/:momentId',
    verifyAuth,//检查权限
    verifyContent,//检查参数content
    verifyPermission,//检查操作权限
    momentContorller.update
)
//删除动态
momentRouter.delete('/:momentId',
    verifyAuth,//检查权限
    verifyPermission,//检查操作权限
    momentContorller.remove
)
module.exports = momentRouter