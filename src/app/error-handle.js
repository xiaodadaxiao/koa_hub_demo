const errorTypes = require('../constants/error-types')
//处理接收到的错误
const errorHandle = (err, ctx) => {
    let returnError = {
        error: '发生未知错误',
        state: 400
    }
    switch (err.message) {
        case errorTypes.NAME_OR_PASSWORD_MUST_NOT_EMPTY:
            returnError.error = '账号和密码不能为空';
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
    }
    ctx.body = returnError;
}
module.exports = errorHandle