//用户动态接口相关的中间件

const errorTypes = require('../constants/error-types')
const { checkParam } = require('../utils/check')
//校验用户动态内容 
const verifyContent = async (ctx, next) => {
    const content = ctx.request.body.content;
    //检查内容
    if (!checkParam(content, { type: 'string' })) {
        return ctx.app.emit('error', new Error(errorTypes.MOMENT_CONTENT_ERROR), ctx)
    }
    await next()
}

//校验查询参数
const verifyDetailListQuery = async (ctx, next) => {
    const { offset, size } = ctx.query;
    //检验参数
    if (!checkParam(offset, { type: 'string', min: 0 })
        || !checkParam(size, { type: 'string', min: 0 })) {
        return ctx.app.emit('error', new Error(errorTypes.QUERY_ERROR), ctx);
    }
    await next()
}
//校验动态标签数组
const verifyLabelArray = async (ctx, next) => {
    const labelArr = ctx.request.body.labels;
    if (!labelArr || (!Array.isArray(labelArr)) || (labelArr.length <= 0)) {
        return ctx.app.emit('error', new Error(errorTypes.QUERY_ERROR), ctx);
    }
    for (let name of labelArr) {
        if (typeof name !== 'string' || name.length > 10) {
            return ctx.app.emit('error', new Error(errorTypes.QUERY_ERROR), ctx);
        }
    }
    await next()
}

module.exports = {
    verifyContent,
    verifyDetailListQuery,
    verifyLabelArray
}