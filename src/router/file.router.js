const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { handleAvatar } = require('../middleware/file.middleware')
const fileController = require('../controller/file.controller')
const uploadRouter = new Router({ prefix: '/upload' })

//头像上传接口
uploadRouter.post('/avatar',
    verifyAuth,//检查登录token
    handleAvatar,//保存图片
    fileController.saveAvatarInfo//保存信息
)
//获得某张头像图片
uploadRouter.get('/avatar/:filename',
    fileController.getAvatarByName
)

module.exports = uploadRouter