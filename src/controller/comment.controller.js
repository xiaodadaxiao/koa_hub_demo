/* 评论相关 */
const commentService = require('../service/comment.service')
class CommentController {
    async create(ctx, next) {
        const userId = ctx.userInfo.id;
        const content = ctx.request.body.content;
        const momentId = ctx.request.params.momentId;
        //发表评论
        const result = await commentService.create(content, userId, momentId);
        ctx.body = result;

    }
    async reply(ctx, next) {
        const userId = ctx.userInfo.id;
        const { content, commentId } = ctx.request.body;
        const momentId = ctx.request.params.momentId;
        //发表评论
        const result = await commentService.reply(content, userId, momentId, commentId);
        ctx.body = result;
    }
    //修改评论
    async update(ctx, next) {
        const commentId = ctx.request.params.commentId;
        const content = ctx.request.body.content;
        //修改数据库
        const result = await commentService.update(content, commentId);
        ctx.body = result
    }
    //删除评论
    async remove(ctx, next) {
        //获取id
        const commentId = ctx.params.commentId;
        //删除
        const reuslt = await commentService.remove(commentId);
        ctx.body = reuslt
    }
    //获得动态的评论列表
    async getCommentByMomentId(ctx, next) {
        const { momentId, offset, size } = ctx.request.query;
        const result = await commentService.getCommentByMomentId(momentId, offset, size);
        ctx.body = result
    }
}
module.exports = new CommentController();