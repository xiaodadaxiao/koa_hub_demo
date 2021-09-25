const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const { setMD5 } = require('../utils/handle-password')
//检测登录参数中间件
const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body;
    //1、检查传递的参数
    if (!name || !password) {
        //触发错误
        const error = new Error(errorTypes.NAME_OR_PASSWORD_MUST_NOT_EMPTY)
        return ctx.app.emit('error', error, ctx)
    }
    //2、检查用户是否存在
    const [user] = await userService.getUserByName(name);
    //用户不存在
    if (!user) {
        //触发错误
        const error = new Error(errorTypes.USER_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    //3、对比加密后的密码是否相同
    if (setMD5(password) !== user.password) {
        //触发错误
        const error = new Error(errorTypes.PASSWORD_ERROR)
        return ctx.app.emit('error', error, ctx)
    }
    await next();
}


module.exports = {
    verifyLogin
}