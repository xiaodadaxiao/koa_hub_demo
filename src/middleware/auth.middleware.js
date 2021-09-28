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

//检查权限 中间件【重点】
/* 
 判断用户对某张表的操作权限，
 那么表中的数据id字段是固定的，user_id字段是固定的（目前要操作的用户id）
 只需要动态改变表名即可
 有两个思路实现：
 思路一：直接 使用闭包在路由传递表名
 思路二：通过解析参数的key名得出表名（所以参数名要规范）
*/
//思路一：
// const verifyPermission =(tableName)=>{
//     //路由传递表名，返回此函数给路由使用
//     return async (ctx, next) => {
//             /* 具体操作。。。 */
//     }
// }
//思路二：解析传递的参数推出表明（所以参数名和表名要规范联系）
const verifyPermission = async (ctx, next) => {
    //获取参数
    //参数一：要操作的用户id值
    const userId = ctx.userInfo.id;
    const [resourceKey] = Object.keys(ctx.params);
    //参数二：表名
    const tableName = resourceKey.replace('Id', "");//去除Id，得到前面的表名
    //参数三：要验证的数据的id值
    const dataId = ctx.params[resourceKey];
    //检查是否有权限
    try {
        const result = await authService.checkPermission(tableName, dataId, userId);
        if (result.length <= 0) {
            throw new Error()
        } else {
            await next();
        }
    } catch (e) {
        ctx.app.emit('error', new Error(errorTypes.NOT_PERMISSION), ctx);
    }
}


module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}