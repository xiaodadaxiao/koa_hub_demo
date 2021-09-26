const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const { setMD5 } = require('../utils/handle-password')
//检测注册用户的参数
const verifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body;
    //1、检查传递的参数
    if (!name || !password) {
        //触发错误
        const error = new Error(errorTypes.NAME_OR_PASSWORD_MUST_NOT_EMPTY)
        return ctx.app.emit('error', error, ctx)
    }
    //2、检查用户是否存在
    const result = await userService.getUserByName(name);
    if (result.length > 0) {
        //触发错误
        const error = new Error(errorTypes.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    await next();
}
//md5加密密码
const encryptionPassword = async (ctx, next) => {
    const password = ctx.request.body.password;
    ctx.request.body.password = setMD5(password);
    await next()
}
module.exports = {
    verifyUser,
    encryptionPassword
}