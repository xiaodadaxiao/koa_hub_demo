const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
//导入公钥
const { PUBLIC_KEY } = require('../app/config')
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
    //传递参数
    ctx.user = user;
    await next();
}

//检测 授权权限token 的中间件
const verifyAuth = async (ctx, next) => {
    //去掉请求头默认前缀 获得token
    const token = ctx.headers.authorization && ctx.headers.authorization.replace('Bearer ', '');
    if (!token) {
        return ctx.app.emit('error', new Error(errorTypes.NOT_TOKEN), ctx);
    }

    let result;
    try {
        result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
    } catch (err) {
        return ctx.app.emit('error', new Error(errorTypes.UNAUTHORIZATION), ctx)
    }
    ctx.userInfo = result;
    await next()
}

//检查权限 中间件
const verifyPermission = async (ctx, next) => {
    //获取参数
    const userId = ctx.userInfo.id;
    const momentId = ctx.params.momentId;
    const result = await authService.checkPermission(momentId, userId);
    if (result.length > 0) {
        await next()
    } else {
        return ctx.app.emit('error', new Error(errorTypes.NOT_PERMISSION), ctx);
    }

}
module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}