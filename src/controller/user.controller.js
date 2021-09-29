
const userService = require('../service/user.service')


class UserController {
    async create(ctx, next) {
        //获取参数
        const userInfo = ctx.request.body;
        //创建用户
        const result = await userService.create(userInfo);
        ctx.body = result


    }
}

module.exports = new UserController();