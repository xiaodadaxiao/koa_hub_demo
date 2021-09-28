const momentService = require('../service/moment.service')
class MomentController {
    //发表动态
    async create(ctx, next) {
        //获取用户id和动态内容
        const userId = ctx.userInfo.id;
        const content = ctx.request.body.content;

        //插入数据
        const result = await momentService.create(userId, content);
        ctx.body = result
    }

    //获取用户单条动态信息
    async detail(ctx, next) {
        const id = ctx.params.momentId;
        const result = await momentService.getDetailById(id);
        if (result.length > 0) {
            ctx.body = result[0]
        } else {
            ctx.body = "查询不到"
        }
    }

    //获取多条动态
    async list(ctx, next) {
        const { offset, size } = ctx.query;
        const result = await momentService.getDetailList(offset, size);
        ctx.body = result
    }

    //修改动态
    async update(ctx, next) {
        //获取id和动态内容
        const momentId = ctx.params.momentId;
        const content = ctx.request.body.content;

        //修改内容
        const result = await momentService.update(momentId, content);
        ctx.body = result
    }
    //删除动态
    async remove(ctx, next) {
        //获取id
        const momentId = ctx.params.momentId;
        //删除
        const reuslt = await momentService.remove(momentId);
        ctx.body = reuslt
    }
    //给动态添加标签
    async addLabels(ctx, next) {
        const labels = ctx.request.body.labels;
        const momentId = ctx.params.momentId;
        console.log(labels);
        for (let label of labels) {
            console.log(label);
            //判断动态是否已经有标签
            const flag = await momentService.hasLabelById(momentId, label.id);
            console.log(flag);
            if (!flag) {
                //动态 -添加- 标签
                await momentService.addLabel(momentId, label.id)
            }
        }
        ctx.body = {
            text: '创建标签成功~',
            labels,
            momentId
        }
    }
}
module.exports = new MomentController()