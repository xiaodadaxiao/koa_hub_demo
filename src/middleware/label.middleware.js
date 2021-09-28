const { checkParam } = require("../utils/check")
const errorTypes = require('../constants/error-types')
const labelService = require('../service/label.service')
const verifyCreateParam = async (ctx, next) => {
    const name = ctx.request.body.name;
    if (!checkParam(name, { type: 'string' })) {
        return ctx.app.emit('error', new Error(errorTypes.QUERY_ERROR), ctx)
    }
    await next()
}
//处理标签，没有就添加
const handleLabels = async (ctx, next) => {
    const labels = ctx.request.body.labels;
    try {


        //循环遍历
        let newLabels = []
        for (let name of labels) {
            let obj = { name }
            //查询该标签是否存在
            const labelResult = await labelService.getLabelByName(name);
            //没有，创建标签
            if (!labelResult) {
                const creteResult = await labelService.create(name);
                obj.id = creteResult.insertId
            } else {
                obj.id = labelResult.id;
            }
            //收集id和name，以备后面中间件使用
            newLabels.push(obj)
        }
        ctx.request.body.labels = newLabels
        await next()
    } catch (e) {
        ctx.app.emit('error', new Error(''), ctx)
    }
}
module.exports = { verifyCreateParam, handleLabels }