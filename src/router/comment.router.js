/* 评论相关路由 */

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const commentController = require('../controller/comment.controller')
const { verifyCreateParam, verifyReplyParam, verifyUpdateParam, verifyGetByCommentParam } = require('../middleware/comment.middleware')
const Router = require('koa-router');

const commentRouter = new Router({ prefix: '/comment' });

//发布评论
commentRouter.post('/:momentId',
    verifyCreateParam,//检查参数
    verifyAuth,//检查授权token

    commentController.create
)
//回复评论
commentRouter.post('/:momentId/reply',
    verifyReplyParam,//检查参数
    verifyAuth,//检查授权token

    commentController.reply
)
//修改评论
commentRouter.patch('/:commentId',
    verifyUpdateParam,//检查参数
    verifyAuth,//检查授权token,
    verifyPermission,//检查操作权限
    commentController.update,

)
//删除评论
commentRouter.delete('/:commentId',
    verifyAuth,//检查授权token,
    verifyPermission,//检查操作权限
    commentController.remove
)
//获得动态的评论列表
commentRouter.get('/moment',
    verifyGetByCommentParam,//检查参数
    commentController.getCommentByMomentId
)
module.exports = commentRouter