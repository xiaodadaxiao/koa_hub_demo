const errorTypes = require('../constants/error-types')
//处理接收到的错误
const errorHandle = (err, ctx) => {
    let returnError = {
        error: '发生未知错误',
        state: 400
    }
    if (err.message) {
        returnError.error = err.message;
    }
    switch (err.message) {
        case errorTypes.NAME_OR_PASSWORD_MUST_NOT_EMPTY:
            returnError.error = '账号或密码不能为空';
            returnError.state = 400
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            returnError.error = '用户已存在';
            break;
        case errorTypes.USER_NOT_EXISTS:
            returnError.error = '用户不存在';
            break;
        case errorTypes.PASSWORD_ERROR:
            returnError.error = '密码错误';
            break;
        case errorTypes.NOT_TOKEN:
            returnError.error = '没有授权token'
            returnError.state = 401
            break;
        case errorTypes.UNAUTHORIZATION:
            returnError.error = 'token无效或过期'
            returnError.state = 401
            break;
        case errorTypes.MOMENT_CONTENT_ERROR:
            returnError.error = 'content字段不能为空且是字符串'
            break;
        case errorTypes.QUERY_ERROR:
            returnError.error = '请求参数错误！'
            break;
        case errorTypes.NOT_PERMISSION:
            returnError.error = '操作权限不足!'
            break;
        case errorTypes.LABEL_CANNOT_REPEAT:
            returnError.error = '标签不能重复!'
            break;

    }
    ctx.body = returnError;
}
module.exports = errorHandle