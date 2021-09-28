/* 权限相关查询 */
const connection = require('../app/database')


//检查用户对数据的操作权限【重点】

const checkPermission = async (tableName, dataId, userId) => {
    const statement = `SELECT * FROM ${tableName} WHERE id=? AND user_id=?`
    const result = await connection.execute(statement, [dataId, userId])
    return result[0]
}

module.exports = {
    checkPermission
}