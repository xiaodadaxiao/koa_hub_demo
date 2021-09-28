const labelService = require('../service/label.service')
const errorTypes = require('../constants/error-types')
class LabelController {
    async create(ctx, next) {
        //创建标签
        const name = ctx.request.body.name;
        try {
            const result = await labelService.create(name);
            ctx.body = result
        } catch (e) {
            return ctx.app.emit('error', new Error(errorTypes.LABEL_CANNOT_REPEAT), ctx);
        }
    }
}

module.exports = new LabelController()