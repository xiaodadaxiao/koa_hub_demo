
//用户动态相关路由
const Router = require('koa-router')

const momentContorller = require('../controller/moment.contorller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { verifyContent, verifyDetailListQuery, verifyLabelArray } = require('../middleware/moment.middleware')
const { handleLabels } = require('../middleware/label.middleware')

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

//获取多条动态
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
//添加标签
momentRouter.post('/:momentId/label',
    verifyLabelArray,//校验标签数组参数
    verifyAuth,//校验权限token
    verifyPermission,//校验操作权限
    handleLabels,//处理标签数组
    momentContorller.addLabels
)
module.exports = momentRouter