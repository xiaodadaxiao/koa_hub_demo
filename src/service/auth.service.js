/* 权限相关查询 */
const connection = require('../app/database')
//检查用户对数据的操作权限
const checkPermission = async (momentId, userId) => {
    const statement = `SELECT * FROM moment WHERE id=? AND user_id=?`
    const result = await connection.execute(statement, [momentId, userId])
    return result[0]
}

module.exports = {
    checkPermission
}