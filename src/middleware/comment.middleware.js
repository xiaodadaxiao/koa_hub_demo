/* 用户评论相关中间件 */

const errorTypes = require('../constants/error-types')
const { checkParam } = require('../utils/check')

//检查评论参数
const verifyCreateParam = async (ctx, next) => {

    const content = ctx.request.body.content;
    const momentId = ctx.request.params.momentId;
    if (!checkParam(content, { type: 'string' })
        || !checkParam(momentId, { type: 'string' })
    ) {
        return ctx.app.emit('error', new Error(errorTypes.QUERY_ERROR), ctx);
    }
    await next()
}
//检查回复参数
const verifyReplyParam = async (ctx, next) => {
    const { content, commentId } = ctx.request.body;
    const momentId = ctx.request.params.momentId;
    if (!checkParam(content, { type: 'string' })
        || !checkParam(momentId, { type: 'string' })
        || !checkParam(commentId, { type: 'number' })
    ) {
        return ctx.app.emit('error', new Error(errorTypes.QUERY_ERROR), ctx);
    }
    await next()
}
//检查修改参数
const verifyUpdateParam = async (ctx, next) => {
    const commentId = ctx.request.params.commentId;
    const content = ctx.request.body.content;
    if (!checkParam(content, { type: 'string' })
        || !checkParam(commentId, { type: 'string' })
    ) {
        return ctx.app.emit('error', new Error(errorTypes.QUERY_ERROR), ctx);
    }
    await next()
}
//检查 根据动态获得评论列表的参数
const verifyGetByCommentParam = async (ctx, next) => {
    const { momentId, offset, size } = ctx.request.query;
    if (!offset || !checkParam(offset, { type: 'string', min: 0 })) {
        ctx.request.query.offset = 0
    }
    if (!size || !checkParam(size, { type: 'string', min: 0 })) {
        ctx.request.query.size = 10
    }
    if (!checkParam(momentId, { type: 'string', min: 0 })) {
        return ctx.app.emit('error', new Error(errorTypes.QUERY_ERROR), ctx);
    }

    await next();
}

module.exports = {
    verifyCreateParam, verifyReplyParam, verifyUpdateParam, verifyGetByCommentParam
}