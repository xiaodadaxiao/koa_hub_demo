/* 定义 错误类型 的常量 */

//密码或用户名不能为空
const NAME_OR_PASSWORD_MUST_NOT_EMPTY = 'NAME_OR_PASSWORD_MUST_NOT_EMPTY'
//用户已存在
const USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS'
//用户不存在
const USER_NOT_EXISTS = 'USER_NOT_EXISTS'
//密码错误
const PASSWORD_ERROR = 'PASSWORD_ERROR'
//没有token
const NOT_TOKEN = 'NOT_TOKEN'
//未授权
const UNAUTHORIZATION = 'UNAUTHORIZATION'
//用户内容错误
const MOMENT_CONTENT_ERROR = 'MOMENT_CONTENT_ERROR'
//参数错误
const QUERY_ERROR = "QUERY_ERROR"
//没有权限
const NOT_PERMISSION = 'NOT_PERMISSION'
// 标签不能重复
const LABEL_CANNOT_REPEAT = 'LABEL_CANNOT_REPEAT'
module.exports = {
    NAME_OR_PASSWORD_MUST_NOT_EMPTY,
    USER_ALREADY_EXISTS,
    USER_NOT_EXISTS,
    PASSWORD_ERROR,
    NOT_TOKEN,
    UNAUTHORIZATION,
    MOMENT_CONTENT_ERROR,
    QUERY_ERROR,
    NOT_PERMISSION,
    LABEL_CANNOT_REPEAT
}